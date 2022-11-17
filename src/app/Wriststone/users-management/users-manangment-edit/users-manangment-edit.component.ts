import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthInfoService } from 'src/app/services/auth/auth-info.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { UserEditDTO, UsersManagementEditDTO } from 'src/app/shared/models/user-models';

@Component({
  selector: 'app-users-manangment-edit',
  templateUrl: './users-manangment-edit.component.html',
  styleUrls: ['./users-manangment-edit.component.css']
})
export class UsersManangmentEditComponent implements OnInit {
  public subscriptions: Subscription;
  userRoles!: string[];
  editForm!: FormGroup;
  warningMessage!: string;
  userId!: number;


  constructor(private navigationService: NavigationService,
    private userService: UserService,
    private usersManamgementService: UsersManagementService,
    private route: ActivatedRoute) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.getAllRoles();
    this.setEditForm();
    this.setUserForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if(this.editForm.invalid) {
      this.warningMessage = "Enter valid data"
    } else {
      this.warningMessage = "";
      this.updateUser();
    }
  }

  updateUser(){
    const editData = this.editForm.value;
    const userEdit: UsersManagementEditDTO = {
      id: this.userId,
      login: editData.login,
      email: editData.email,
      fullname: editData.fullname,
      userRole: editData.userRole
    };

    this.subscriptions.add(
      this.usersManamgementService.updateUser(userEdit)
      .subscribe((event) => {
        this.editForm.reset();
        this.navigationService.goToFullRoute(`/users/list`);
      },
      (error) => {
        console.log(error);
      })
    )
  }

  getAllRoles(){
    this.usersManamgementService.getAllRoles()
      .subscribe((userRoles) => {
        this.userRoles = userRoles
      });
  }

  getUser(){
    this.usersManamgementService.getAllRoles()
      .subscribe((userRoles) => {
        this.userRoles = userRoles
      })
  }

  setEditForm(){
    this.editForm = new FormGroup ({
      'login' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'fullname' : new FormControl(null),
      'userRole' : new FormControl(null, [Validators.required])
    });
  }

  setUserForm(){
    this.route.params.subscribe(
      (params: Params) => {
        this.usersManamgementService.getUser(params.id)
          .subscribe((user) => {
            this.editForm.setValue({
              login: user.login,
              email: user.email,
              fullname: user.fullname ? user.fullname : '',
              userRole: user.userRole
            });
            this.userId = user.id;
          }
        );
      }
    );
  }

  cancel(){
    this.navigationService.goToFullRoute(`/users/list`);
  }
}
