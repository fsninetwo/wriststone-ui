import { Action, createFeatureSelector, createReducer, createSelector } from "@ngrx/store";
import { produce } from "immer";
import { User } from "src/app/shared/models/user-models";
import { AuthActions, AuthActionType } from "./auth.actions";
import { AuthState } from "./auth.states";

const initialState: AuthState = {
  currentUser: null
};

export const producer = (
  state: AuthState,
  action: AuthActionType
) => {
  AuthActions.match(action, {
    Login: (currentUser: any) => {
      state.currentUser = currentUser
    },
    Logout: () => {
      state.currentUser = null
    }
  })
}

const reducer = produce(producer, initialState)

export function authReducer(state: any, action: any) {
  return reducer(state, action);
}
