"use client";

import { signInWithCredentials, signInWithGoogle } from "@actions/login";
import { useLogin } from "@refinedev/core";
import { Provider, loginOptions } from "@types";
import { useTransition } from "react";

export default function Login() {
  const { mutate: login } = useLogin<loginOptions>();
  const [isPending, startTransition] = useTransition();

  const handleSignInWithCredentials = async () => {
    const response = await signInWithCredentials(
      "nguyendat@gmaul.com",
      "ahihih"
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => {
          signInWithGoogle();
          login({ providerName: Provider.Google });
        }}
      >
        Sign in Google
      </button>

      <button onClick={handleSignInWithCredentials}>Sign in Credentials</button>
    </div>
  );
}
