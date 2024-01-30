import { produce } from "immer";
import { User } from "src/app/shared/models/user-models";
import { AuthActions, AuthActionsType } from "./auth.actions";
import { AuthState, initialState } from "./auth.states";

export const authProducer = (state: AuthState, action: AuthActionsType) =>
  AuthActions.match(action, {
    Login: (value: { user: User | null }) => {
      state.currentUser = value.user
    },
    Logout: () => {
      state.currentUser = null
    },
    default: () => {},
  })

export const authReducerProducer = produce(authProducer, initialState);

export function authReducer(state: any, action: any) {
  return authReducerProducer(state, action);
}
