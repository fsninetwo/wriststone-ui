import { HttpClient, HttpRequest, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { observable, Observable } from "rxjs";
import { AuthInfoService } from "src/app/services/auth/auth-info.service";
import { User, UserRole } from "src/app/shared/models/user-models";
import { AuthInterceptor } from "./auth-interceptor.service";

const user: User = {
  id: "test",
  login: "test",
  email: "test",
  userGroup: UserRole.User,
  token: "test",
}

export function tokenGetter() {
  return "test";
}

export class AuthInfoServiceMock {
  public getCurrentUser(): User {
    return user;
  }
}

describe("AuthInterceptor", () => {
  let httpMock: HttpClient;
  let httpClientMock: HttpTestingController;
  let interceptor: AuthInterceptor;
  let authInfoServiceMock: AuthInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:4200"],
            },
        })],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthInfoService, useClass: AuthInfoServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    httpClientMock = TestBed.inject(HttpTestingController);
    httpMock = TestBed.inject(HttpClient);
    authInfoServiceMock = TestBed.inject(AuthInfoService);
    interceptor = new AuthInterceptor(authInfoServiceMock);
  });

  it("should create", () => {
    expect(interceptor).toBeTruthy();

  });

  it("anonymous request should not return headers", () => {
    const next: any = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.has("Authorization")).toBeFalsy();
        return Observable.create(subscriber => {
          subscriber.complete();
        });
      }
    };

    const requestMock = new HttpRequest("GET", "/Auth/");

    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(interceptor).toBeTruthy();
    });
  });

  it("non anonymous request should return aothorization headers", () => {
    const next: any = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.has("Authorization")).toBeTruthy();
        expect(req.headers.get("Authorization")).toEqual("Bearer test");
        return Observable.create(subscriber => {
          subscriber.complete();
        });
      }
    };

    const requestMock = new HttpRequest("GET", "/test/");

    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(interceptor).toBeTruthy();
    });
  });
});

