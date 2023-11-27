import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { NavigationService } from "../navigation.service";
import { AuthInfoService } from "./auth-info.service";

@Injectable({ providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(
    private navigationService: NavigationService,
    private authInfoService: AuthInfoService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authInfoService.isAuthorized()){
      return this.HasRequiredPermission(route.data, route.data.availableFor);
    }

    this.navigationService.goToFullRoute("auth/login");

    return false;
  }

  protected async HasRequiredPermission(data: any, access: string) {
    const result = this.authInfoService.hasPermission(this.getPermissionName(data), access);

    if(!result) {
      this.navigationService.goToFullRoute("auth/login");
    }

    return result;
  }

  private getPermissionName(routeData: any) {
    return routeData["permissionName"] || routeData["pageName"];
  }
}
