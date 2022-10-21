import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PermissionDTO } from "../shared/models/permisson-models";
import { UserRegisterDTO, UserCredentialsDTO, UserAuthResponseDTO } from "../shared/models/user-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {
  }

  getDefaultPermissions() {
    const url = this.apiService.getMsApi({
      api: 'getDefaultPermissions',
      msEndPoint: 'wriststone'
    });

    return this.http.get<Array<PermissionDTO>>(url);
  }

  getPermissions() {
    const url = this.apiService.getMsApi({
      api: 'getPermissions',
      msEndPoint: 'wriststone'
    });

    return this.http.get<Array<PermissionDTO>>(url);
  }
}
