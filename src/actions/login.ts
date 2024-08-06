"use server";

import { signIn } from "@auth";
import { DEFAULT_LOGIN_REDIRECT_PATH } from "@routes";
import { AuthError } from "next-auth";

export type SignInResponse = {
  error?: string;
  ok: boolean;
};

export async function signInWithGoogle() {
  try {
    await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT_PATH });
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

export async function signInWithCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT_PATH,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError": {
          return { error: error.cause?.err?.message };
        }
        default:
          return { error: "An authentication error occurred" };
      }
    }
    throw error;
  }
}
