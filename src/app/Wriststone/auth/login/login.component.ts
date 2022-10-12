import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserCredentialsDTO } from 'src/app/shared/models/UserModels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  warningMessage!: string;
  subscriptions: Subscription;

  constructor(private navigationService: NavigationService, private authService: AuthService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'login' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      this.warningMessage = "Enter valid data"
    } else {
      this.warningMessage = "";
      this.authorizeUser();
      this.loginForm.reset();
    }
  }

  authorizeUser(){
    const loginData = this.loginForm.value;

    const userCredentials: UserCredentialsDTO = {
      login: loginData.login,
      password: loginData.password
    };

    this.subscriptions.add(
      this.authService.authorize(userCredentials)
      .subscribe((authResponse) => {
        if(authResponse.isAuthSuccessful) {
          this.authService.setCurrentUser(authResponse.token);
          this.navigationService.goToFullRoute('/');
        } else {
          this.warningMessage = authResponse.errorMessage;
        }
      },
      (error) => {
        console.log(error);
      })
    )
  }

  goToSignup(): void {
    this.navigationService.goToFullRoute('/auth/signup');
  }
}
