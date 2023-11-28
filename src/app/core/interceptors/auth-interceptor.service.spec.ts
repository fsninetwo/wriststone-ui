import { HttpClient, HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
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

export class AuthInfoServiceMock {
  public getCurrentUser(): User {
    return user;
  }
}

describe('AuthInterceptorService', () => {
  let httpClientMock: HttpClient;
  let httpTestingController: HttpTestingController;
  let interceptor: AuthInterceptor;
  let authInfoServiceMock: AuthInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { providers: AuthInfoService, useClass: AuthInfoServiceMock },
      ]
    });

    httpClientMock = TestBed.get(HttpTestingController);
    authInfoServiceMock = TestBed.get(AuthInfoService);
    interceptor = TestBed.inject(AuthInterceptor);
  });

  const next: any = {
    handle: () => {
      return Observable.create(subscriber => {
        subscriber.complete();
      });
    }
  };

  const requestMock = new HttpRequest('GET', '/Auth')

  it("should create", () => {
    interceptor.intercept(requestMock, next).subscribe(() => {
      expect(interceptor).toBeTruthy();
    });
  });
});

