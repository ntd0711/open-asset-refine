"use client";

import { Button } from "@components/ui/button";
import { useLogin } from "@refinedev/core";
import { LoginOptions } from "@types";
import { signIn } from "next-auth/react";
import React, { use } from "react";

type Props = {};

const ButtonActionsGroup = (props: Props) => {
  const { data, mutate: login } = useLogin<LoginOptions>();
  return (
    <div className="sm:max-w-[320px]">
      <div className="flex flex-col gap-[10px] mb-[60px]">
        <Button className="bg-white text-[#A8A8A8] text-[15px] leading-[21px] w-[100%] max-w-[320px] mx-auto py-[14px] h-auto hover:bg-white">
          Googleで登録
        </Button>
        <div className="bg-[#212121] w-[100%] h-[0.33px]"></div>
        <Button
          className="bg-[#1976D2] text-[#FFFFFF] text-[15px] leading-[21px] w-[100%] max-w-[320px] mx-auto py-[14px] h-auto hover:bg-[#1976D2]"
          onClick={() => {}}
        >
          メールアドレスで登録
        </Button>
        <p className="text-[12px] leading-[18px]">
          アカウントを登録することにより、利用規約とプライバシーポリシー（Cookieの使用を含む）に同意したとみなされます。
        </p>
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="text-[13px] leading-[19.5px]">アカウントをお持ちの場合</p>
        <Button
          className="text-[#212121] bg-[#FFFFFF] text-[15px] leading-[21px] w-[100%] max-w-[320px] mx-auto py-[14px] h-auto hover:bg-white"
          onClick={() => {}}
        >
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default ButtonActionsGroup;
