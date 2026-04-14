import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { UserRegisterDto, UsersManagementCreateDto } from 'src/app/shared/models/user-models';

@Component({
    selector: 'app-users-manangment-add',
    templateUrl: './users-manangment-add.component.html',
    styleUrls: ['./users-manangment-add.component.css'],
    standalone: false
})
export class UsersManangmentAddComponent implements OnInit {
  public subscriptions: Subscription;
  userRoles!: string[];
  addForm!: UntypedFormGroup;
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
    this.setAddForm();
    this.setUserForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if(this.addForm.invalid) {
      this.warningMessage = "Enter valid data"
    } else {
      this.warningMessage = "";
      this.addUser();
    }
  }

  addUser(){
    const editData = this.addForm.value;
    const userEdit: UserRegisterDto = {
      login: editData.login,
      email: editData.email,
      password: editData.password,
      fullname: editData.fullname,
      userRole: editData.userRole,
      created: new Date()
    };

    this.subscriptions.add(
      this.usersManamgementService.addUser(userEdit)
      .subscribe((event) => {
        this.addForm.reset();
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

  setAddForm(){
    this.addForm = new UntypedFormGroup ({
      'login' : new UntypedFormControl(null, [Validators.required]),
      'email' : new UntypedFormControl(null, [Validators.required, Validators.email]),
      'password' : new UntypedFormControl(null, [Validators.required, Validators.pattern("^[A-Za-z0-9]{8,30}$")]),
      'fullname' : new UntypedFormControl(null),
      'userRole' : new UntypedFormControl(null, [Validators.required])
    });
  }

  setUserForm(){
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params.id;
        this.addForm.patchValue({
          userRole: this.userRoles?.[0]
        });
      }
    );
  }

  cancel(){
    this.navigationService.goToFullRoute(`/users/list`);
  }
}
