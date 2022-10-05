import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserAuthResponseDTO, UserCredentialsDTO } from "../shared/models/UserModels";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  authorize(userCredentials: UserCredentialsDTO) {
    const url = this.apiService.getMsApi({
      api: 'authorize',
      msEndPoint: 'wriststone'
    })

    return this.http.post<UserAuthResponseDTO>(url, userCredentials);
  }

  isAuthorized() {
    const token = localStorage.getItem('token');

    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
