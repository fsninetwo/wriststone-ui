import { User } from "src/app/shared/models/user-models";

export interface AuthState {
  currentUser: User | null;
}
