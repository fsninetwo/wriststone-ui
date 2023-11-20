import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NavigationService } from "src/app/services/navigation.service";
import { AuthService } from "src/app/services/auth.service";
import { UserCredentialsDto } from "src/app/shared/models/user-models";
import { AuthInfoService } from "src/app/services/auth/auth-info.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errorMessage!: string;
  subscriptions: Subscription;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private authInfoService: AuthInfoService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      "login" : new FormControl(null, Validators.required),
      "password" : new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSubmit(): void {
    if(this.loginForm.invalid) {
      this.errorMessage = "Enter valid data";
      return;
    }

    this.errorMessage = "";
    this.authorizeUser(this.loginForm);
    this.loginForm.reset();
  }

  public goToSignup(): void {
    this.navigationService.goToFullRoute("/auth/signup");
  }

  private authorizeUser(loginForm: FormGroup): void {
    const loginData = loginForm.value;

    const userCredentials: UserCredentialsDto = {
      login: loginData.login,
      password: loginData.password
    };

    this.subscriptions.add(
      this.authService.authorize(userCredentials)
        .subscribe((authResponse) => {
          if(!authResponse.isAuthSuccessful) {
            this.errorMessage = authResponse.errorMessage;
            return;
          }

          this.authInfoService.setCurrentUser(authResponse.token);
          this.navigationService.goToFullRoute("/");
        },
        (error) => {
          console.log(error);
        })
      );
  }
}
