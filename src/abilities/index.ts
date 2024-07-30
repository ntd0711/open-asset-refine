import { userPermissions } from "@abilities/rules";
import { Action, Subject } from "@abilities/types";
import { AbilityBuilder, AbilityClass, PureAbility } from "@casl/ability";
import { UserResponse } from "@types";

type PossibleAbilities = [Action | string, Subject | string];

export type AppAbility = PureAbility<PossibleAbilities>;
export const AppAbility = PureAbility as AbilityClass<AppAbility>;

export const defineAbilityFor = (user: UserResponse) => {
  const builder = new AbilityBuilder(AppAbility);

  userPermissions[user.role](builder, user);

  return builder.build({
    detectSubjectType: (object: { _typename: string }) =>
      object._typename as Subject,
  });
};
