import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { UserEditDTO, UserGroup, UserRegisterDTO } from 'src/app/shared/models/UserModels';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public subscriptions: Subscription;
  userSub!: Subscription;
  editForm!: FormGroup;
  warningMessage!: string;
  userId!: number;


  constructor(private navigationService: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.editForm = new FormGroup ({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.pattern("^[A-Za-z0-9]{8,30}$")]),
      'fullname' : new FormControl(null)
    });
    this.route.params.subscribe(
      (params: Params) => {
        this.userSub = this.authService.currentUser
          .subscribe(user => {
            this.editForm.setValue({
              email: user.email,
              password: '',
              fullname: ''
            });
            this.userId = Number(user.id);
        });
      }
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if(this.editForm.invalid) {
      this.warningMessage = "Enter valid data"
    } else {
      this.warningMessage = "";
      this.registerUser();
    }
  }

  registerUser(){
    const signupData = this.editForm.value;
    const userEdit: UserEditDTO = {
      id: this.userId,
      email: signupData.email,
      password: signupData.password,
      fullName: signupData.fullName,
    };

    this.subscriptions.add(
      this.userService.editUser(userEdit)
      .subscribe((event) => {
        this.editForm.reset();
        this.navigationService.goToFullRoute(`/user/${this.userId}`);
      },
      (error) => {
        console.log(error);
      })
    )
  }

}
