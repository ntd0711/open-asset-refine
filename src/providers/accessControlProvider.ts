import { defineAbilityFor } from "@abilities";
import { Action } from "@abilities/types";
import { AccessControlProvider } from "@refinedev/core";
import { getSession } from "next-auth/react";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    const session = await getSession();

    const ability = defineAbilityFor(session?.user);
    const caslAction =
      action === "list" || action === "show" ? Action.Read : action;

    return {
      can: ability.can(caslAction, resource);
      reason: "Unauthorized",
    }
  },
};
