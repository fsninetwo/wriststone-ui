import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { PermissionService } from "src/app/services/permission.service";
import { User } from "src/app/shared/models/user-models";
import { AppState } from "../app.states";
import { PermissionsActions } from "../permissions/permissions.actions";
import { getCurrentUser } from "./auth.selectors";

@Injectable()
export class AuthEffects {
  updatePermissions$ = this.actions$.pipe(
    ofType("Login", "Logout"),
    withLatestFrom(this.store$.select(getCurrentUser)),
    mergeMap(([actions, user]) => {
      this.localStorageService.removeItem('permissions');
      if(user) {
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
          (error) => {
            console.log(error);
          }
        ));
      } else {
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
          (error) => {
            console.log(error);
          }
        ));
      }
    })
  )

  constructor(
    private actions$: Actions<any>,
    private store$: Store<AppState>,
    private permissionService: PermissionService,
    private localStorageService: LocalStorageService){
    }

  getPermissionsAction(user: User | null) {

  }
}
