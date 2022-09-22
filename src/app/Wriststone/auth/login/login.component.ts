import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  warningMessage!: string;

  constructor(private navigationService: NavigationService) {}

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
      console.log(this.loginForm);
      this.loginForm.reset();
    }
  }

  goToSignup(): void {
    this.navigationService.goToFullRoute('/auth/signup');
  }
}
