import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap } from "rxjs/operators";
import { nonAuthorizationEndpoints } from "src/app/services/auth/models/auth-endpoints";
import { AuthService } from "../../services/auth.service";
import { AuthInfoService } from "../../services/auth/auth-info.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthInfoService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Auth Interceptor");
    const user = this.authService.getCurrentUser();

    if(!this.isRequestAnonymous(req.url)){
      if(user && user.token) {
        const modReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
        return next.handle(modReq);
      } else {
        throw Error("User is not authorized");
      }
    }
    return next.handle(req);
  }

  private isRequestAnonymous(requestUrl: string): boolean {
    for (let address of nonAuthorizationEndpoints) {
      if (new RegExp(address).test(requestUrl)) {
        return true;
      }
    }
    return false;
  }
}
