import { Permission } from "src/app/shared/models/permisson-models";

export interface PermissionsState {
  currentPermissions: Permission[];
}

export const initialState: PermissionsState = {
  currentPermissions: []
};
