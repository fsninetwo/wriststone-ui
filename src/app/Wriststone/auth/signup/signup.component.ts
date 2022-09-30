import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  warningMessage!: string;

  public subscriptions: Subscription;

  constructor(private navigationService: NavigationService, private authService: AuthService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup ({
      'login' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.pattern("^[A-Za-z0-9]{8,30}$")]),
      'fullname' : new FormControl(null)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if(this.signupForm.invalid) {
      this.warningMessage = "Enter valid data"
    } else {
      this.warningMessage = "";
      console.log(this.signupForm);
      this.signupForm.reset();
    }
  }

  goToLogin() {
    this.navigationService.goToFullRoute('/auth/login');
  }



}
