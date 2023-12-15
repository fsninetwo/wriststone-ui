import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.states";
import { authReducer } from "./auth/auth.reducer";

export const appState: ActionReducerMap<AppState> = {
  authState: authReducer
}

