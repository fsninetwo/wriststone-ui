import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    this.authInfoService.initializePermissions();
    this.userSub = this.authInfoService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userId = !!user ? user.id : '';
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  hasPermission(page: string, access: string){
    if(this.isAuthenticated) {
      return this.authInfoService.hasPermission(page, access);
    }
    return false;
  }

  logout(): void {
    this.authInfoService.removeCurrentUser();
  }
}
