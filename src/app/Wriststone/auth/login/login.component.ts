import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm | undefined;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  goToSignup(): void {
    this.navigationService.goToFullRoute('/auth/signup');
  }
}
