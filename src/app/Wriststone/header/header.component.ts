import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;

  constructor(private authService : AuthService) { }

  isAuthenticated = false;
  userId!: string;

  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.userId = user.id;
      } else {
        this.isAuthenticated = false;
        this.userId = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
