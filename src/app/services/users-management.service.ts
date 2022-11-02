import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersManagementDTO } from "../shared/models/user-models";
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

    return this.http.get<Array<UsersManagementDTO>>(url);
  }
}
