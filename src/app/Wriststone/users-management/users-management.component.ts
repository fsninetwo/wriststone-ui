import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { UsersManagementDTO } from 'src/app/shared/models/user-models';

@Component({
  selector: 'app-user',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users!: Array<UsersManagementDTO>;

  constructor(private navigationService: NavigationService,
    private usersManagementService: UsersManagementService) { }

  ngOnInit(): void {
    this.usersManagementService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

}
