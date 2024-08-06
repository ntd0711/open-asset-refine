import React from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@components/auth/Credenza";
import { useFormContext } from "react-hook-form";
import { CredentialUserSignUp } from "./CredentialUserSignUpModal";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

type Props = {
  onNext: () => void;
};

export const EmailVerify = (props: Props) => {
  const {
    getValues,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useFormContext<CredentialUserSignUp>();
  const handleSubmit = async () => {
    const isValid = await trigger("verificationCode");
    console.log({ isValid });
    if (!isValid) return;
    props.onNext();
  };
  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          メールアドレスを認証して下さい
        </CredenzaTitle>
        <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]">
          メールを送信しました。
          〇〇〇〇〇〇〇〇@gmail.comメールに届いたリンクの認証コードを入力してOpen
          Threadsをはじめましょう！
        </CredenzaDescription>
      </CredenzaHeader>
      <CredenzaBody>
        <FormField
          control={control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="＠テキスト" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CredenzaBody>
      <CredenzaFooter>
        <Button
          className="bg-[#1976D2] hover:bg-[#1976D2]"
          onClick={handleSubmit}
        >
          TOPへ戻る
        </Button>
        {/* <CredenzaClose asChild>
          <Button variant="link">閉じる</Button>
        </CredenzaClose> */}
      </CredenzaFooter>
    </CredenzaContent>
  );
};
