import { inject, TestBed } from "@angular/core/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Permission } from "src/app/shared/models/permisson-models";
import { User, UserRole } from "src/app/shared/models/user-models";
import { StoreMock } from "src/app/store/app.mock-store";
import { AppState } from "src/app/store/app.states";
import { PermissionsActions } from "src/app/store/permissions/permissions.actions";
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
        { provide: Store, useClass: StoreMock }
      ],
    });
    service = TestBed.inject(AuthInfoService);
  });

  beforeEach(inject([Store], (store: Store<AppState>) => {
    store.dispatch(PermissionsActions.SetPermissions({ permissions }));
  }))

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  describe("getCurrentUser return valid user", () => {
    let store: StoreMock<any>;
    beforeEach(inject([Store], (appStore: StoreMock<any>) => {
      store = appStore;
      store.setState(user);
    }));

    it("getCurrentUser return valid user", () => {
      const result = service.getCurrentUser();
      expect(result).toEqual(user);
    });
  });


  it("removeCurrentUser should comlete susscessfully", () => {
    spyOn(service["localStorageService"], "removeItem");
    service.removeCurrentUser();

    expect(service["localStorageService"].removeItem).toHaveBeenCalledWith("userData");
  });

  it("setCurrentUser should set correct user", () => {
    const jwtHelperService = spyOn(service["jwtHelperService"], "decodeToken").and.returnValue(tokenData);
    spyOn(service["localStorageService"], "setItem");
    service.setCurrentUser(tokenData);

    expect(jwtHelperService).toHaveBeenCalledWith(tokenData);
  });

  describe("hasPermission, ", () => {
    let store: StoreMock<any>;
    beforeEach(inject([Store], (appStore: StoreMock<any>) => {
      store = appStore;
      store.setState(permissions);
    }));

    it("should return true when has access to default permissons", () => {
      store.setState(defaultPermissions);
      service.removeCurrentUser();
      const result = service.hasPermission("test", "test");
      expect(result).toBeTrue();
    });

    it("should return false when has access to default permissons, but not to role permissions", () => {
      store.setState(defaultPermissions);
      service.removeCurrentUser();
      const result = service.hasPermission("test1", "test1");
      expect(result).toBeFalse();
    });

    it("should return true when user has access to permisson", () => {
      spyOn(service["jwtHelperService"], "decodeToken").and.returnValue(tokenData);
      service.setCurrentUser(tokenData);
      const result = service.hasPermission("test", "test");
      expect(result).toBeTrue();
    });

    it("should return false when user has no access to permisson", () => {
      spyOn(service["jwtHelperService"], "decodeToken").and.returnValue(tokenData);
      service.setCurrentUser(tokenData);
      const result = service.hasPermission("test2", "test2");
      expect(result).toBeFalse();
    });
  });

  describe("isAuthorized, ", () => {
    let store: StoreMock<any>;
    beforeEach(inject([Store], (appStore: StoreMock<any>) => {
      store = appStore;
      store.setState(user);
    }));

    it("user is null and should return false", () => {
      store.setState(null);
      spyOn(service["jwtHelperService"], "isTokenExpired");

      const result = service.isAuthorized();

      expect(service["jwtHelperService"].isTokenExpired).toHaveBeenCalledTimes(0);
      expect(result).toBeFalse();
    });

    it("token is expired and should return false", () => {
      const jwtHelperService =
        spyOn(service["jwtHelperService"], "isTokenExpired").and.returnValue(true);

      const result = service.isAuthorized();

      expect(jwtHelperService).toHaveBeenCalledWith("test");
      expect(result).toBeFalse();
    });

    it("token is valid should return true", () => {
      spyOn(service["jwtHelperService"], "isTokenExpired");

      const result = service.isAuthorized();

      expect(service["jwtHelperService"].isTokenExpired).toHaveBeenCalledWith("test");
      expect(result).toBeTrue();
    });
  })
});
