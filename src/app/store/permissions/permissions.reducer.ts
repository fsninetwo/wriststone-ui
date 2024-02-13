import { produce } from "immer";
import { Permission } from "src/app/shared/models/permisson-models";
import { User } from "src/app/shared/models/user-models";
import { PermissionsActions, PermissionsActionsType, } from "./permissions.actions";
import { initialState, PermissionsState } from "./permissions.states";

export const permissionsProducer = (state: PermissionsState, action: PermissionsActionsType) =>
  PermissionsActions.match(action, {
    SetPermissions: (value: { permissions: Permission[] }) => {
      state.currentPermissions = value.permissions
    },
    default: () => {},
  })

export const permissionsReducerProducer = produce(permissionsProducer, initialState);

export function permissionsReducer(state: any, action: any) {
  return permissionsReducerProducer(state, action);
}
