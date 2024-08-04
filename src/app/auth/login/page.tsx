"use client";
import { signInWithCredentials, signInWithGoogle } from "@actions/login";
import { Button } from "@components/ui/button";
import { useLogin } from "@refinedev/core";
import { LoginOptions } from "@types";
import { signIn } from "next-auth/react";

export default function Login() {
  const { mutate: login, error, data } = useLogin<LoginOptions>();
  console.log({ error, data });
  return (
    <div className="py-[34px] px-[20px] sm:p-0 sm:flex sm:h-[100%]">
      Login page
      <Button
        onClick={async () => {
          try {
            await signInWithGoogle();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Google Login
      </Button>
      <Button
        onClick={async () => {
          const result = await signInWithCredentials("ahihi", "ahihi");
          console.log({ result });
        }}
      >
        Credential Login
      </Button>
    </div>
  );
}
