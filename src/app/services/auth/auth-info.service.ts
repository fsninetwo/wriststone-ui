import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { PermissionDTO } from "src/app/shared/models/permisson-models";
import { User } from "src/app/shared/models/user-models";
import { ApiService } from "../configuration/api.service";
import { PermissionService } from "../permission.service";
import { tokenConstants } from "./models/token-constants";

@Injectable(
  { providedIn: 'root' }
)

export class AuthInfoService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  private permissions: Array<PermissionDTO> = [];
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private permissionService: PermissionService,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userData')!));
    this.currentUser = this.currentUserSubject.asObservable();
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

  hasPermission(permissionName: string, accessLavel: string){
    const permission = this.permissions.find(
      x => x.permission.toLowerCase() === permissionName.toLowerCase()
      && x.accessLevel.toLowerCase() === accessLavel.toLowerCase()
    )

    return !!permission;
  }

  initializePermissions() {
    if(this.getCurrentUser()){
      this.permissionService.getPermissions()
      .subscribe((event) => {
        this.permissions = event;
      },
      (error) => {
        console.log(error);
      });
    } else {
      this.permissionService.getDefaultPermissions()
      .subscribe((event) => {
        this.permissions = event;
      },
      (error) => {
        console.log(error);
      });
    }
  }
}
