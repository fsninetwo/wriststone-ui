import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.states";
import { authReducer } from "./auth/auth.reducer";
import { permissionsReducer } from "./permissions/permissions.reducer";

export const appState: ActionReducerMap<AppState> = {
  authState: authReducer,
  permissionsState: permissionsReducer
}

