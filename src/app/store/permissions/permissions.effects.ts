import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { withLatestFrom, mergeMap, map, tap } from "rxjs/operators";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { PermissionService } from "src/app/services/permission.service";
import { AppState } from "../app.states";
import { getCurrentUser } from "../auth/auth.selectors";
import { PermissionsActions } from "./permissions.actions";

@Injectable()
export class PermissionsEffects {
  updateLoginPermissions$ = createEffect(() => this.actions$.pipe(
    ofType("Login"),
    tap((actions) => {
      this.localStorageService.removeItem('permissions');
      return this.permissionService.getPermissions().pipe(
        map((permissions) => {
          this.localStorageService.setItem(
            'permissions',
            JSON.stringify(permissions)
          );

          return PermissionsActions.SetPermissions({
            permissions: permissions ?? [],
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      ));
    })
  ), { dispatch: false });

  updateLogoutPermissions$ = createEffect(() => this.actions$.pipe(
    ofType("Logout"),
    tap((actions) => {
      this.localStorageService.removeItem('permissions');
      return this.permissionService.getDefaultPermissions().pipe(
        map((permissions) => {
          this.localStorageService.setItem(
            'permissions',
            JSON.stringify(permissions)
          );

          return PermissionsActions.SetPermissions({
            permissions: permissions ?? [],
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      ));
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions<any>,
    private store$: Store<AppState>,
    private permissionService: PermissionService,
    private localStorageService: LocalStorageService){
    }
}
