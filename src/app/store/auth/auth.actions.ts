import { User } from 'src/app/shared/models/user-models';
import unionize, { ofType } from 'unionize';

export const AuthActions = unionize(
  {
    Login: ofType<{ currentUser: User | null }>(),
    Logout: ofType<{}>(),
  },
  { tag: 'type', value: 'payload' }
);

export type AuthActionType = typeof AuthActions._Union;
