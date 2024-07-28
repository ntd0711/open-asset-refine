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

export async function signInWithCredentials(
  email: string,
  password: string
): Promise<SignInResponse> {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_PATH,
    });
    if (result) {
      return {
        ok: true,
      };
    }
    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      if ((error.type = "CredentialsSignin")) {
        return { ok: false, error: "Invalid credentials" };
      }
      return { ok: false, error: "An unexpected error occurred" };
    }
    throw error;
  }
}
