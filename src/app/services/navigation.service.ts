import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor( private router: Router ) {}

  goToFullRoute(route: string, options?: NavigationExtras) {
    this.router.navigate([route], options);
  }
}
