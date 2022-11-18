import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRegisterDTO, UsersManagementDTO, UsersManagementEditDTO } from "../shared/models/user-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})

export class UsersManagementService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient) {}

  getAllUsers() {
    const url = this.apiService.getMsApi({
      api: 'getAllUsers',
      msEndPoint: 'wriststone'
    });

    return this.http.get<UsersManagementDTO[]>(url);
  }

  getAllRoles() {
    const url = this.apiService.getMsApi({
      api: 'getAllUserRoles',
      msEndPoint: 'wriststone'
    });

    return this.http.get<string[]>(url);
  }

  getUser(userId: number) {
    const url = this.apiService.getMsApi({
      api: 'getManagementUser',
      msEndPoint: 'wriststone',
      innerParams: { userId }
    });

    return this.http.get<UsersManagementEditDTO>(url);
  }

  updateUser(userEdit: UsersManagementEditDTO) {
    const url = this.apiService.getMsApi({
      api: 'updateManagementUser',
      msEndPoint: 'wriststone'
    });

    return this.http.put<UsersManagementEditDTO>(url, userEdit);
  }

  addUser(userCreate: UserRegisterDTO) {
    const url = this.apiService.getMsApi({
      api: 'addManagementUser',
      msEndPoint: 'wriststone',
    });

    return this.http.post(url, userCreate);
  }

  removeUser(userId: number) {
    const url = this.apiService.getMsApi({
      api: 'removeManagementUser',
      msEndPoint: 'wriststone',
      innerParams: { userId }
    });

    return this.http.delete(url);
  }
}
