import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../auth.service";
import { NavigationService } from "../navigation.service";
import { AuthInfoService } from "./auth-info.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private navigationService: NavigationService, private authInfoService: AuthInfoService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authInfoService.isAuthorized()){
      return true;
    }

    this.navigationService.goToFullRoute('auth/login');

    return false;
  }
}
