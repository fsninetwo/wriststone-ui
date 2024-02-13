import { User } from "src/app/shared/models/user-models";
import unionize, { ofType, UnionOf } from "unionize";

export const AuthActions = unionize({
  SetCurrentUser: ofType<{ user: User | null }>(),
  Login: ofType<{user: User | null}>(),
  Logout: ofType<{}>()
}, {
  tag: "type",
  value: "payload"
});

export type AuthActionsType = UnionOf<typeof AuthActions>;
