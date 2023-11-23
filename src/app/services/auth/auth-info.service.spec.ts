import { TestBed } from "@angular/core/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from "rxjs";
import { Permission } from "src/app/shared/models/permisson-models";
import { User, UserRole } from "src/app/shared/models/user-models";
import { LocalStorageService } from "../local-storage.service";
import { PermissionService } from "../permission.service";
import { AuthInfoService } from "./auth-info.service";

const defaultPermissions: Permission[] = [
  { permission: "test", accessLevel: "test" }
];

const permissions: Permission[] = [
  { permission: "test", accessLevel: "test" },
  { permission: "test1", accessLevel: "test1" }
];

const user: User = {
  id: "test",
  login: "test",
  email: "test",
  userGroup: UserRole.User,
  token: "test",
}

const tokenData: any = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "test",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "test",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "test",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": 1
};

export class JwtHelperServiceMock {
  public decodeToken(token?: string | undefined): any {
    return of(tokenData);
  }
  public isTokenExpired(token: string): boolean {
    return false;
  }
}

export class PermissionServiceMock {
  public getDefaultPermissions(): Observable<Permission[]> {
    return of(defaultPermissions);
  }

  public getPermissions(): Observable<Permission[]> {
    return of(permissions);
  }
}

export class LocalStorageServiceMock {
  public setItem(key: string, value: string): void {
  }

  public getItem(key: string): string | null {
    return key == "permissions"
      ? JSON.stringify(permissions)
      : JSON.stringify(user);
  }

  public removeItem(key: string): void {
  }
}

describe("AuthInfoService", () => {
  let service: AuthInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: JwtHelperService, useClass: JwtHelperServiceMock },
        { provide: PermissionService, useClass: PermissionServiceMock },
        { provide: LocalStorageService, useClass: LocalStorageServiceMock },
      ],
    });
    service = TestBed.inject(AuthInfoService);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("getCurrentUser return valid user", () => {
    const result = service.getCurrentUser();
    expect(result).toEqual(user);
  });

  it("removeCurrentUser should comlete susscessfully", () => {
    spyOn(service["localStorageService"], "removeItem");
    const permissonService = spyOn(service["permissionService"], "getDefaultPermissions").and.returnValue(of(defaultPermissions));
    spyOn(service["localStorageService"], "setItem");
    service.removeCurrentUser();

    expect(service["localStorageService"].removeItem).toHaveBeenCalledWith("userData");
    expect(permissonService).toHaveBeenCalled();
    expect(service["localStorageService"].setItem).toHaveBeenCalledWith("permissions", JSON.stringify(defaultPermissions));
  });

  it("setCurrentUser should set correct user", () => {
    const jwtHelperService = spyOn(service["jwtHelperService"], "decodeToken").and.returnValue(tokenData);
    spyOn(service["localStorageService"], "setItem");
    const permissonService = spyOn(service["permissionService"], "getPermissions").and.returnValue(of(permissions));
    service.setCurrentUser(tokenData);

    expect(jwtHelperService).toHaveBeenCalledWith(tokenData);
    expect(permissonService).toHaveBeenCalled();
    expect(service["localStorageService"].setItem).toHaveBeenCalledWith("permissions", JSON.stringify(permissions));
  });

  it("hasPermission should return true when has access to default permissons", () => {
    service.removeCurrentUser();
    const result = service.hasPermission("test", "test");
    expect(result).toBeTrue();
  });

  it("hasPermission should return false when has access to default permissons, but not to role permissions", () => {
    service.removeCurrentUser();
    const result = service.hasPermission("test1", "test1");
    expect(result).toBeFalse();
  });

  it("hasPermission should return true when user has access to permisson", () => {
    spyOn(service["jwtHelperService"], "decodeToken").and.returnValue(tokenData);
    service.setCurrentUser(tokenData);
    const result = service.hasPermission("test", "test");
    expect(result).toBeTrue();
  });

  it("hasPermission should return false when user has no access to permisson", () => {
    spyOn(service["jwtHelperService"], "decodeToken").and.returnValue(tokenData);
    service.setCurrentUser(tokenData);
    const result = service.hasPermission("test2", "test2");
    expect(result).toBeFalse();
  });

  it("isAuthorized token is null and should return false", () => {
    const localStorageService =
    spyOn(service["localStorageService"], "getItem").and.returnValue(null);
    spyOn(service["jwtHelperService"], "isTokenExpired");

    const result = service.isAuthorized();

    expect(localStorageService).toHaveBeenCalledWith("userData");
    expect(service["jwtHelperService"].isTokenExpired).toHaveBeenCalledTimes(0);
    expect(result).toBeFalse();
  });

  it("isAuthorized token is expired and should return false", () => {
    const localStorageService =
      spyOn(service["localStorageService"], "getItem").and.returnValue(JSON.stringify(user));
    const jwtHelperService =
      spyOn(service["jwtHelperService"], "isTokenExpired").and.returnValue(true);

    const result = service.isAuthorized();

    expect(localStorageService).toHaveBeenCalledWith("userData");
    expect(jwtHelperService).toHaveBeenCalledWith("test");
    expect(result).toBeFalse();
  });

  it("isAuthorized token is valid should return true", () => {
    const localStorageService =
      spyOn(service["localStorageService"], "getItem").and.returnValue(JSON.stringify(user));
    spyOn(service["jwtHelperService"], "isTokenExpired");

    const result = service.isAuthorized();

    expect(localStorageService).toHaveBeenCalledWith("userData");
    expect(service["jwtHelperService"].isTokenExpired).toHaveBeenCalledWith("test");
    expect(result).toBeTrue();
  });
});
