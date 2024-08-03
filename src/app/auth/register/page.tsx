"use client";

import { signInWithCredentials, signInWithGoogle } from "@actions/login";
import ButtonActionsGroup from "@components/auth/ButtonActionsGroup";
import LeftSide from "@components/auth/LeftSide";
import RightSide from "@components/auth/RightSide";
import { Provider, loginOptions } from "@types";
import { useTransition } from "react";

export default function Register() {
  // const handleSignInWithCredentials = async () => {};

  return (
    <div className="py-[34px] px-[20px] sm:p-0 sm:flex sm:h-[100%]">
      <LeftSide />
      <RightSide />
    </div>
  );
}
