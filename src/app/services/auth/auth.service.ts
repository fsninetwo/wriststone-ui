import { HttpClient } from "@angular/common/http";
import { stripGeneratedFileSuffix } from "@angular/compiler/src/aot/util";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { tokenConstants } from "../../shared/models/token-constants";
import { User, UserAuthResponseDTO, UserCredentialsDTO, UserRegisterDTO } from "../../shared/models/UserModels";
import { ApiService } from "../configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userData')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(userCredentials: UserRegisterDTO) {
    const url = this.apiService.getMsApi({
      api: 'register',
      msEndPoint: 'wriststone'
    });

    return this.http.post(url, userCredentials);
  }

  authorize(userCredentials: UserCredentialsDTO) {
    const url = this.apiService.getMsApi({
      api: 'authorize',
      msEndPoint: 'wriststone'
    });

    return this.http.post<UserAuthResponseDTO>(url, userCredentials);
  }

  logout() {
    this.removeCurrentUser();
  }

  isAuthorized() {
    const data = localStorage.getItem('userData');
    if(!data) {
      this.removeCurrentUser();
      return false;
    }

    const user = JSON.parse(data);
    if(this.jwtHelper.isTokenExpired(user.token)){
      this.removeCurrentUser();
      return false;
    }

    return true;

  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  setCurrentUser(token: string) {
    if(token) {
      const data = this.jwtHelper.decodeToken(token);

      const user = new User (
        data[tokenConstants.id].toString(),
        data[tokenConstants.name].toString(),
        data[tokenConstants.email].toString(),
        data[tokenConstants.role].toString(),
        token);

      localStorage.setItem('userData', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  removeCurrentUser() {
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null!);
  }
}
