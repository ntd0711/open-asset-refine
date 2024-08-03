import { AppAbility } from "@abilities";
import { AbilityBuilder } from "@casl/ability";
import { UserResponse } from "@types";
import { Action, Subject } from "./types";

type DefineAbilities = (
  builder: AbilityBuilder<AppAbility>,
  user: UserResponse
) => void;
export const userPermissions: Record<"admin" | "user", DefineAbilities> = {
  admin: ({ can }) => {
    can(Action.Manage, Subject.All);
  },
  user: ({ can }, user) => {
    can(Action.Read, Subject.All);
    can(Action.Update, Subject.Comment, { creator_id: user.id });
    can(Action.Update, Subject.Post, { creator_id: user.id });
  },
};
