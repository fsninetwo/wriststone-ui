import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDto, UserEditDto } from "../shared/models/user-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient) {}

  getUser(userId: number) {

    const url = this.apiService.getMsApi({
      api: 'getUser',
      msEndPoint: 'wriststone',
      innerParams: { userId }
    });

    return this.http.get<UserDto>(url);
  }

  editUser(userEdit: UserEditDto) {

    const url = this.apiService.getMsApi({
      api: 'editUser',
      msEndPoint: 'wriststone'
    });

    return this.http.post<UserEditDto>(url, userEdit);
  }
}
