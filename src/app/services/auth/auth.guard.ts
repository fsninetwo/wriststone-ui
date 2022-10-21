import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { NavigationService } from "../navigation.service";
import { AuthInfoService } from "./auth-info.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private navigationService: NavigationService, private authInfoService: AuthInfoService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authInfoService.isAuthorized()){
      return this.HasRequiredPermission(route.data, route.data['availableFor']);
    }

    this.navigationService.goToFullRoute('auth/login');

    return false;
  }

  protected HasRequiredPermission(data: any, access: string) {
    const result = this.authInfoService.hasPermission(data['pageName'], access);

    if(!result) {
      this.navigationService.goToFullRoute('auth/login');
    }

    return result;
  }
}
