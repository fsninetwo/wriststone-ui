import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
  }

  goToLogin() {
    this.navigationService.goToFullRoute('/auth/login');
  }

}
