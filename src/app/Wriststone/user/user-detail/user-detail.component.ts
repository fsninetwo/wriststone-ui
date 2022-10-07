import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/shared/models/UserModels';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userInfo!: UserDTO;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(1)
      .subscribe((user) => {
        this.userInfo = user;
      }
    );
  }
}
