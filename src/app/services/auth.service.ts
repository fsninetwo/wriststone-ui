import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuthResponseDTO, UserCredentialsDto, UserRegisterDTO } from "../shared/models/user-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {
  }

  register(userCredentials: UserRegisterDTO) {
    const url = this.apiService.getMsApi({
      api: 'register',
      msEndPoint: 'wriststone'
    });

    return this.http.post(url, userCredentials);
  }

  authorize(userCredentials: UserCredentialsDto) {
    const url = this.apiService.getMsApi({
      api: 'authorize',
      msEndPoint: 'wriststone'
    });

    return this.http.post<UserAuthResponseDTO>(url, userCredentials);
  }
}
