import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { Permission } from "src/app/shared/models/permisson-models";
import { User } from "src/app/shared/models/user-models";
import { ApiService } from "../configuration/api.service";
import { PermissionService } from "../permission.service";
import { tokenConstants } from "./models/token-constants";

@Injectable(
  { providedIn: 'root' }
)

export class AuthInfoService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private currentPermissions: Array<Permission>;

  constructor(
    private permissionService: PermissionService
  ) {
    this.currentPermissions = new Array<Permission>(JSON.parse(localStorage.getItem('permissions')!));
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
      this.initializePermissions();
    }
  }

  removeCurrentUser() {
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null!);
    this.updatePermissions();
  }

  hasPermission(permissionName: string, accessLavel: string){
    if(!this.currentPermissions) {
      this.initializePermissions();
    }
    const permission = this.currentPermissions.find(
      x => x.permission.toLowerCase() === permissionName.toLowerCase()
      && x.accessLevel.toLowerCase() === accessLavel.toLowerCase()
    )

    return !!permission;
  }

  initializePermissions() {
    if(this.getCurrentUser()){
      this.getPermissions();
    } else {
      this.getDefaultPermissions();
    }
  }

  private updatePermissions() {
    localStorage.removeItem('permissions');
    this.currentPermissions = null!;
    this.initializePermissions();
  }

  private getPermissions(){
    this.permissionService.getPermissions()
      .subscribe((permissions) => {
        localStorage.setItem('permissions', JSON.stringify(permissions));
        this.currentPermissions = permissions;
      },
      (error) => {
        console.log(error);
      });
  }

  private getDefaultPermissions(){
    this.permissionService.getDefaultPermissions()
      .subscribe((permissions) => {
        localStorage.setItem('permissions', JSON.stringify(permissions));
        this.currentPermissions = permissions;
      },
      (error) => {
        console.log(error);
      });
  }
}
