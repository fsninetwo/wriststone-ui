import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthInfoService } from 'src/app/services/auth/auth-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;

  constructor(private authInfoService : AuthInfoService) { }

  isAuthenticated = false;
  userId!: string;

  ngOnInit(): void {
    this.userSub = this.authInfoService.currentUser.subscribe(user => {
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
    this.authInfoService.logout();
  }
}
