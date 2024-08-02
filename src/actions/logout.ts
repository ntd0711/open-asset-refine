"use server";

import { signOut } from "@auth";
import { CookieToken } from "@constants/auth";
import { cookies } from "next/headers";

export const logout = async () => {
  cookies().delete(CookieToken);
  await signOut({ redirect: true, redirectTo: "/auth/login" });
};
