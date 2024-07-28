"use client";

import { signInWithCredentials, signInWithGoogle } from "@actions/login";
import { useLogin } from "@refinedev/core";
import { Provider, loginOptions } from "@types";
import { useTransition } from "react";

export default function Login() {
  const { mutate: login } = useLogin<loginOptions>();

  const handleSignInWithCredentials = async () => {};

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
          login({ providerName: "google" });
        }}
      >
        Sign in Google
      </button>

      <button
        onClick={() => {
          login({
            providerName: "credentials",
            email: "nguyendat@gmaul.com",
            password: "ahihih",
          });
        }}
      >
        Sign in Credentials
      </button>
    </div>
  );
}
