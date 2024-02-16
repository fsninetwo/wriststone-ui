import { Component, OnInit } from "@angular/core";
import { NavigationService } from "src/app/services/navigation.service";
import { UsersManagementService } from "src/app/services/users-management.service";
import { PaginationModel } from "src/app/shared/models/pagination.model";
import { UsersManagementDto } from "src/app/shared/models/user-models";

@Component({
  selector: "app-users-manangment-list",
  templateUrl: "./users-manangment-list.component.html",
  styleUrls: ["./users-manangment-list.component.css"],
})
export class UsersManangmentListComponent implements OnInit {
  users!: UsersManagementDto[];
  filteredUsers!: UsersManagementDto[];
  pagination: PaginationModel = {
    pageIndex: 1,
    pageSize: 1,
    totalSize: 0,
  };

  constructor(
    private navigationService: NavigationService,
    private usersManagementService: UsersManagementService
  ) {}

  ngOnInit(): void {
    this.updateUsersList();
  }

  public search(event: any): void {
    const text = event.target.value;

    if (!text) {
      this.filteredUsers = this.users;
      return;
    }

    if (text.length >= 3) {
      this.filteredUsers = this.users.filter(
        (x) =>
          x.login.includes(text.toLowerCase()) ||
          x.email.includes(text.toLowerCase()) ||
          x.userRole.includes(text.toLowerCase())
      );
    }
  }

  public goToEditUser(id: number): void {
    this.navigationService.goToFullRoute(`users/${id}/edit`);
  }

  public goToAddUser(): void {
    this.navigationService.goToFullRoute(`users/add`);
  }

  public removeUser(id: number): void {
    this.usersManagementService.removeUser(id).subscribe((event) => {
      this.updateUsersList();
    });
  }

  public onChangePage(event: any) {
    console.log(event);
  }

  private updateUsersList(): void {
    this.usersManagementService
      .getPaginatedAllUsers(this.pagination)
      .subscribe((paginatedUsers) => {
        this.users = paginatedUsers.items;
        this.filteredUsers = this.users;
        this.pagination.pageIndex = paginatedUsers.pageIndex;
        this.pagination.pageSize = paginatedUsers.pageSize;
        this.pagination.totalSize = paginatedUsers.totalCount;
      });
  }
}
