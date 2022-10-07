import { HttpClient } from "@angular/common/http";
import { stripGeneratedFileSuffix } from "@angular/compiler/src/aot/util";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Subject } from "rxjs";
import { tokenConstants } from "../shared/models/token-constants";
import { User, UserAuthResponseDTO, UserCredentialsDTO, UserRegisterDTO } from "../shared/models/UserModels";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  jwtHelper: JwtHelperService = new JwtHelperService();
  user = new Subject<User>();

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

  logout() {
    this.removeUser();
  }

  isAuthorized() {
    const data = localStorage.getItem('userData');
    if(!data) {
      this.user.next(undefined);
      return false;
    }

    const user = JSON.parse(data);
    if(this.jwtHelper.isTokenExpired(user.token)){
      this.user.next(undefined);
      return false;
    }

    return true;

  }

  setUser(token: string) {
    if(token) {
      const data = this.jwtHelper.decodeToken(token);

      const id = data[tokenConstants.id].toString();
      const name = data[tokenConstants.name].toString();
      const email = data[tokenConstants.email].toString();
      const role = data[tokenConstants.role].toString();

      const user = new User (id, name, email, role, token);

      localStorage.setItem('userData', JSON.stringify(user));
      this.user.next(user);
    }
  }

  removeUser() {
    localStorage.removeItem('userData');
    this.user.next(undefined);
  }
}
