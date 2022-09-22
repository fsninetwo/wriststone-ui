import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  warningMessage!: string;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup ({
      'login' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.pattern("^[A-Za-z0-9]{8,30}$")]),
      'fullname' : new FormControl(null)
    });
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
