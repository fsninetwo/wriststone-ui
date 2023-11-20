import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NavigationExtras } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthInfoService } from "src/app/services/auth/auth-info.service";
import { NavigationService } from "src/app/services/navigation.service";
import { UserAuthResponseDto, UserCredentialsDto } from "src/app/shared/models/user-models";

import { LoginComponent } from "./login.component";

const authErrorMessage = "User was not found";

const authData: UserCredentialsDto = {
  login: "test",
  password: "test"
};

const authResponse: UserAuthResponseDto = {
  isAuthSuccessful: true,
  errorMessage: "",
  token: "test",
};

const errorAuthResponse: UserAuthResponseDto = {
  isAuthSuccessful: false,
  errorMessage: authErrorMessage,
  token: "",
};

export class NavigationServiceMock {
  public goToFullRoute(route: string, options?: NavigationExtras): void {
  }
}

export class AuthInfoServiceMock {
  public setCurrentUser(token: string): void {
  }
}

export class AuthServiceMock {
  public authorize(userCredentials: UserCredentialsDto): Observable<UserAuthResponseDto> {
    return of(authResponse);
  }
}

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [
        { provide: NavigationService, useClass: NavigationServiceMock },
        { provide: AuthInfoService, useClass: AuthInfoServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call onSumbit method", () => {
    spyOn(component, "onSubmit");
    const submitButtonElement = fixture.debugElement.query(By.css("#login")).nativeElement;
    submitButtonElement.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should return error message if all fields are empty", () => {
    component.loginForm.controls["login"].setValue("");
    component.loginForm.controls["password"].setValue("");
    expect(component.loginForm.valid).toBeFalsy();
    fixture.detectChanges();

    component.onSubmit();
    expect(component.errorMessage).toEqual("Enter valid data");
  });

  it("should call onSumbit method", () => {
    fixture.detectChanges();
    spyOn(component, "goToSignup");
    let submitButtonElement = fixture.debugElement.query(By.css("#sign-up")).nativeElement;
    submitButtonElement.click();
    expect(component.goToSignup).toHaveBeenCalledTimes(1);
  });

  it("should call onSumbit method and return valid response", () => {
    component.loginForm.controls["login"].setValue("test");
    component.loginForm.controls["password"].setValue("test");
    expect(component.loginForm.valid).toBeTruthy();
    fixture.detectChanges();

    const authService = spyOn(component["authService"], "authorize").and.returnValue(of(authResponse));
    const authInfoService = spyOn(component["authInfoService"], "setCurrentUser");
    spyOn(component["navigationService"], "goToFullRoute");
    component.onSubmit();

    expect(authService).toHaveBeenCalledWith(authData);
    expect(authInfoService).toHaveBeenCalledWith("test");
    expect(component["navigationService"].goToFullRoute).toHaveBeenCalledWith("/");
  });

  it("should call onSumbit method and return valid response", () => {
    component.loginForm.controls["login"].setValue("test");
    component.loginForm.controls["password"].setValue("test");
    expect(component.loginForm.valid).toBeTruthy();
    fixture.detectChanges();

    const authService = spyOn(component["authService"], "authorize").and.returnValue(of(errorAuthResponse));
    component.onSubmit();

    expect(authService).toHaveBeenCalledWith(authData);
    expect(component.errorMessage).toEqual(authErrorMessage);
  });

  it("should call onSumbit method and return api error", () => {
    component.loginForm.controls["login"].setValue("test");
    component.loginForm.controls["password"].setValue("test");
    expect(component.loginForm.valid).toBeTruthy();
    fixture.detectChanges();

    const authService = spyOn(component["authService"], "authorize").and.returnValue(throwError("Api Error"));
    component.onSubmit();

    expect(authService).toHaveBeenCalledWith(authData);
  });

  it("should call goToFullRoute when calling onSumbit method", () => {
    spyOn(component["navigationService"], "goToFullRoute");
    fixture.detectChanges();

    component.goToSignup();
    expect(component["navigationService"].goToFullRoute).toHaveBeenCalledWith("/auth/signup");
  });
});
