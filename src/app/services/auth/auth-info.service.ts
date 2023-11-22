import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { Permission } from "src/app/shared/models/permisson-models";
import { User } from "src/app/shared/models/user-models";
import { LocalStorageService } from "../local-storage.service";
import { PermissionService } from "../permission.service";
import { tokenConstants } from "./models/token-constants";

@Injectable(
  { providedIn: "root" }
)

export class AuthInfoService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private currentPermissions: Permission[];

  constructor(
    private jwtHelperService: JwtHelperService,
    private permissionService: PermissionService,
    private localStorageService: LocalStorageService
  ) {
    this.currentPermissions = JSON.parse(this.localStorageService.getItem("permissions")!);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.localStorageService.getItem("userData")!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthorized() {
    const data = this.localStorageService.getItem("userData");
    if(!data) {
      this.removeCurrentUser();
      return false;
    }

    const user = JSON.parse(data);
    if(this.jwtHelperService.isTokenExpired(user.token)){
      this.removeCurrentUser();
      return false;
    }

    return true;
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(token: string) {
    if(token) {
      const data = this.jwtHelperService.decodeToken(token);

      const user = new User (
        data[tokenConstants.id].toString(),
        data[tokenConstants.name].toString(),
        data[tokenConstants.email].toString(),
        data[tokenConstants.role].toString(),
        token);

      this.localStorageService.setItem("userData", JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.initializePermissions();
    }
  }

  public removeCurrentUser() {
    this.localStorageService.removeItem("userData");
    this.currentUserSubject.next(null!);
    this.updatePermissions();
  }

  public hasPermission(permissionName: string, accessLavel: string){
    if(!this.currentPermissions) {
      this.initializePermissions();
    }
    const permission = this.currentPermissions.find(
      x => x.permission.toLowerCase() === permissionName.toLowerCase()
        && x.accessLevel.toLowerCase() === accessLavel.toLowerCase()
    )

    return !!permission;
  }

  public initializePermissions() {
    this.getCurrentUser()
      ? this.getPermissions()
      : this.getDefaultPermissions();
  }

  private updatePermissions() {
    this.localStorageService.removeItem("permissions");
    this.currentPermissions = null!;
    this.initializePermissions();
  }

  private getPermissions(){
    this.permissionService.getPermissions()
      .subscribe((permissions) => {
        this.localStorageService.setItem("permissions", JSON.stringify(permissions));
        this.currentPermissions = permissions;
      },
      (error) => {
        console.log(error);
      });
  }

  private getDefaultPermissions(){
    this.permissionService.getDefaultPermissions()
      .subscribe((permissions) => {
        this.localStorageService.setItem("permissions", JSON.stringify(permissions));
        this.currentPermissions = permissions;
      },
      (error) => {
        console.log(error);
      });
  }
}
