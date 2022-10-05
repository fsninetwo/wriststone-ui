import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { NavigationService } from "./navigation.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private navigationService: NavigationService, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isAuthorized()){
      return true;
    }

    this.navigationService.goToFullRoute('auth/login');

    return false;
  }
}
