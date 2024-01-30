import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NavigationService } from "src/app/services/navigation.service";
import { ofType } from "unionize";
import { AppState } from "../app.states";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<any>,
    private store$: Store<AppState>,
    private navigationService: NavigationService){
    }
}
