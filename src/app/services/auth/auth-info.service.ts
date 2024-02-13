import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/shared/models/permisson-models';
import { User } from 'src/app/shared/models/user-models';
import { AppState } from 'src/app/store/app.states';
import { LocalStorageService } from '../local-storage.service';
import { PermissionService } from '../permission.service';
import { tokenConstants } from './models/token-constants';
import { map } from 'rxjs/operators';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { getCurrentUser } from 'src/app/store/auth/auth.selectors';
import { PermissionsActions } from 'src/app/store/permissions/permissions.actions';
import { getCurrentPermissions } from 'src/app/store/permissions/permissions.selectors';

@Injectable({ providedIn: 'root' })
export class AuthInfoService {
  public currentUser: Observable<User>;

  constructor(
    private jwtHelperService: JwtHelperService,
    private permissionService: PermissionService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    const user = JSON.parse(
      this.localStorageService.getItem('userData')!
    ) as User;
    this.store.dispatch(AuthActions.SetCurrentUser({ user }));

    const currentPermissions = JSON.parse(
      this.localStorageService.getItem('permissions')!
    );
    this.store.dispatch(
      PermissionsActions.SetPermissions({
        permissions: currentPermissions ?? [],
      })
    );

    this.currentUser = this.store
      .select(getCurrentUser)
      .pipe(map((payload: any) => payload));
  }

  public isAuthorized(): boolean {
    let isAuthorized: boolean = true;
    this.store.select(getCurrentUser).subscribe((payload: User | null) => {
      if (!payload) {
        this.removeCurrentUser();
        isAuthorized = false;
        return;
      }

      if (this.jwtHelperService.isTokenExpired(payload?.token)) {
        this.removeCurrentUser();
        isAuthorized = false;
        return;
      }
    });

    return isAuthorized;
  }

  public getCurrentUser(): User | null {
    let selectedUser: User | null = null;
    this.store.select(getCurrentUser).subscribe((payload: User | null) => {
      selectedUser = payload;
    });

    return selectedUser;
  }

  public setCurrentUser(token: string) {
    if (token) {
      const data = this.jwtHelperService.decodeToken(token);

      const user = new User(
        data[tokenConstants.id].toString(),
        data[tokenConstants.name].toString(),
        data[tokenConstants.email].toString(),
        data[tokenConstants.role].toString(),
        token
      );

      this.localStorageService.setItem('userData', JSON.stringify(user));
      this.store.dispatch(AuthActions.Login({ user }));
      this.initializePermissions();
    }
  }

  public removeCurrentUser() {
    this.localStorageService.removeItem('userData');
    this.store.dispatch(AuthActions.Logout());
  }

  public hasPermission(permissionName: string, accessLavel: string): boolean {
    let permission: Permission | undefined;

    this.store.select(getCurrentPermissions).subscribe((permissions: Permission[]) => {
      if (!permissions) {
        this.initializePermissions();
      }
      permission = permissions.find(
        (x) =>
          x.permission.toLowerCase() === permissionName.toLowerCase() &&
          x.accessLevel.toLowerCase() === accessLavel.toLowerCase()
      );
    });

    return !!permission;
  }

  public initializePermissions() {
    this.getCurrentUser()
      ? this.getPermissions()
      : this.getDefaultPermissions();
  }

  private getPermissions() {
    this.permissionService.getPermissions().subscribe(
      (permissions) => {
        this.localStorageService.setItem(
          'permissions',
          JSON.stringify(permissions)
        );
        this.store.dispatch(
          PermissionsActions.SetPermissions({
            permissions: permissions ?? [],
          })
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getDefaultPermissions() {
    this.permissionService.getDefaultPermissions().subscribe(
      (permissions) => {
        this.localStorageService.setItem(
          'permissions',
          JSON.stringify(permissions)
        );
        this.store.dispatch(
          PermissionsActions.SetPermissions({
            permissions: permissions ?? [],
          })
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
