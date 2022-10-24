import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthInfoService } from 'src/app/services/auth/auth-info.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  private userSub!: Subscription;
  constructor(private authInfoService : AuthInfoService) { }

  isAuthenticated = false;
  userId!: string;
  userName!: string;

  ngOnInit(): void {
    this.userSub = this.authInfoService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userId = !!user ? user.id : '';
      this.userName = !!user ? user.login : '';
    });
  }

  hasPermission(page: string, access: string){
    if(this.isAuthenticated) {
      return this.authInfoService.hasPermission(page, access);
    }
    return false;
  }
}
