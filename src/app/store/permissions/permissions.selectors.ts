import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PermissionsState } from "./permissions.states";

export const getPermissionsState = createFeatureSelector<PermissionsState>('permissionsState');

export const getCurrentPermissions = createSelector(
  getPermissionsState,
  (state: PermissionsState) => state.currentPermissions
)
