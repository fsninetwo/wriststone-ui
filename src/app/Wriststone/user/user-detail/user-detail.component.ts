import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/shared/models/user-models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userInfo!: UserDTO;
  userSub!: Subscription;
  userId!: number;

  constructor(
    private navigationService: NavigationService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.userSub = this.userService.getUser(params.id)
          .subscribe((user) => {
            this.userInfo = user;
            this.userId = Number(params.id);
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
