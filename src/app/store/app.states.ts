import { AuthState } from "./auth/auth.states";
import { PermissionsState } from "./permissions/permissions.states";

export interface AppState {
  authState: AuthState,
  permissionsState: PermissionsState
}
