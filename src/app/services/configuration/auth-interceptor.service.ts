import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Api Interceptor");
    const user = this.authService.getCurrentUser();

    if(user && user.token){
      const modReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return next.handle(modReq);
    }

    return next.handle(req);
  }
}
