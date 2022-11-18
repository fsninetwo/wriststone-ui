import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { UsersManagementDTO } from 'src/app/shared/models/user-models';

@Component({
  selector: 'app-users-manangment-list',
  templateUrl: './users-manangment-list.component.html',
  styleUrls: ['./users-manangment-list.component.css']
})
export class UsersManangmentListComponent implements OnInit {
  usersSaved!: UsersManagementDTO[];
  users!: UsersManagementDTO[];

  constructor(private navigationService: NavigationService,
    private usersManagementService: UsersManagementService) { }

  ngOnInit(): void {
    this.updateUsersList();
  }

  search(event: any){
    const text = event.target.value;

    if(!text || text === ''){
      this.users = this.usersSaved;
    } else if (text.length >= 3) {
      this.users = this.usersSaved.filter(x => x.login.includes(text.toLowerCase())
        || x.email.includes(text.toLowerCase()) || x.userRole.includes(text.toLowerCase()))
    }
  }

  goToEditUser(id: number){
    this.navigationService.goToFullRoute(`users/${id}/edit`);
  }

  goToAddUser(){
    this.navigationService.goToFullRoute(`users/add`);
  }

  removeUser(id: number){
    this.usersManagementService.removeUser(id)
      .subscribe(event => {
        this.updateUsersList();
      });
  }

  private updateUsersList(){
    this.usersManagementService.getAllUsers()
      .subscribe(users => {
        this.usersSaved = users;
        this.users = this.usersSaved;
      });
  }
}
