import { Action } from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import { AuthState } from "./auth.states";


const initialState: AuthState = {
  currentUser: null
};

export function authReducer(state: any = initialState, action: Action) {
  switch(action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        currentUser: action
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        currentUser: null
      }
  }
}
