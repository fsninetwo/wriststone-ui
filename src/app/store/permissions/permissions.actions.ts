import { Permission } from "src/app/shared/models/permisson-models";
import unionize, { ofType, UnionOf } from "unionize";

export const PermissionsActions = unionize({
  SetPermissions: ofType<{ permissions: Permission[] }>(),
}, {
  tag: "type",
  value: "payload"
});

export type PermissionsActionsType = UnionOf<typeof PermissionsActions>;
