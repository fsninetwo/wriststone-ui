import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserAuthResponseDTO, UserCredentialsDTO, UserRegisterDTO } from "../shared/models/UserModels";
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

  register(userCredentials: UserRegisterDTO) {
    const url = this.apiService.getMsApi({
      api: 'register',
      msEndPoint: 'wriststone'
    })

    return this.http.post(url, userCredentials);
  }

  authorize(userCredentials: UserCredentialsDTO) {
    const url = this.apiService.getMsApi({
      api: 'authorize',
      msEndPoint: 'wriststone'
    })

    return this.http.post<UserAuthResponseDTO>(url, userCredentials);
  }

  isAuthorized() {
    const token = localStorage.getItem('token');

    if(token && !this.jwtHelper.isTokenExpired(token)) {
        console.log(this.jwtHelper.decodeToken(token));
    }

    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
