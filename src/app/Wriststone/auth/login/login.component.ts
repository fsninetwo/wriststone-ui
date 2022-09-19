import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
  }

  goToSignup() {
    this.navigationService.goToFullRoute('/auth/signup');
  }
}
