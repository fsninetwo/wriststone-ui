import { TestBed } from "@angular/core/testing"
import { ActivatedRouteSnapshot, Data, NavigationExtras, RouterStateSnapshot } from "@angular/router";
import { AuthConstant } from "src/app/shared/models/constatnts/page-constands";
import { NavigationService } from "../navigation.service";
import { AuthInfoService } from "./auth-info.service";
import { AuthGuard } from "./auth.guard";


export class NavigationServiceMock {
  public goToFullRoute(route: string, options?: NavigationExtras): void {
  }
}

export class AuthInfoServiceMock {
  public isAuthorized(token: string): boolean {
    return true;
  }

  public hasPermission(permissionName: string, accessLevel: string): boolean {
    return true;
  }
}

function createFakeRouteState(url: string): ActivatedRouteSnapshot {
  return {
    url: url,
    data: {
      availableFor: AuthConstant.writeAccess
    } as Data
 } as any;
}


describe("AuthGuard", () => {
  const fakeUrl = "login/auth";
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: AuthInfoService, useClass: AuthInfoServiceMock },
      ]
    });

    guard = TestBed.inject(AuthGuard);
  })

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("successful authentifiaction should return true", async () => {
    const authInfoService = spyOn(guard["authInfoService"], "isAuthorized").and.returnValue(true);
    const authInfoServiceWithPermission = spyOn(guard["authInfoService"], "hasPermission").and.returnValue(true);
    spyOn(guard["navigationService"], "goToFullRoute");
    const canActivate = guard.canActivate(
      createFakeRouteState(fakeUrl),
      {} as RouterStateSnapshot);

    expect(await canActivate).toBeTrue();
    expect(authInfoService).toHaveBeenCalled();
    expect(authInfoServiceWithPermission).toHaveBeenCalled();
    expect(guard["navigationService"].goToFullRoute).toHaveBeenCalledTimes(0);
  });

  it("unauthorized authentifiaction should return false", async () => {
    const authInfoService = spyOn(guard["authInfoService"], "isAuthorized").and.returnValue(false);
    const authInfoServiceWithPermission = spyOn(guard["authInfoService"], "hasPermission");
    spyOn(guard["navigationService"], "goToFullRoute");

    const canActivate = guard.canActivate(
      createFakeRouteState(fakeUrl),
      {} as RouterStateSnapshot);

    expect(await canActivate).toBeFalse();
    expect(authInfoService).toHaveBeenCalled();
    expect(authInfoServiceWithPermission).toHaveBeenCalledTimes(0);
    expect(guard["navigationService"].goToFullRoute).toHaveBeenCalledWith("auth/login");
  });

  it("no permission authentifiaction should return false", async () => {
    const authInfoService = spyOn(guard["authInfoService"], "isAuthorized").and.returnValue(true);
    const authInfoServiceWithPermission = spyOn(guard["authInfoService"], "hasPermission").and.returnValue(false);
    spyOn(guard["navigationService"], "goToFullRoute");
    const canActivate = guard.canActivate(
      createFakeRouteState(fakeUrl),
      {} as RouterStateSnapshot);

    expect(await canActivate).toBeFalse();
    expect(authInfoService).toHaveBeenCalled();
    expect(authInfoServiceWithPermission).toHaveBeenCalled();
    expect(guard["navigationService"].goToFullRoute).toHaveBeenCalledWith("auth/login");
  });
})
