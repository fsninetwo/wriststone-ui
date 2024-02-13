import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.states";

export const getAuthState = createFeatureSelector<AuthState>('authState');

export const getCurrentUser = createSelector(
  getAuthState,
  (state: AuthState) => state.currentUser
)
