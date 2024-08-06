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

export const EmailConfirm = (props: Props) => {
  const {
    getValues,
    watch,
    control,
    trigger,
    setError,
    formState: { errors },
  } = useFormContext<CredentialUserSignUp>();

  const handleSubmit = async () => {
    const isValid = await validateEmailFields();
    if (isValid) {
      props.onNext();
    }
  };

  const validateEmailFields = async (): Promise<boolean> => {
    const isValid = await trigger(["email", "confirmEmail"]);
    if (isValid) {
      const emailValue = getValues("email");
      const confirmEmailValue = getValues("confirmEmail");
      if (emailValue !== confirmEmailValue) {
        setError("confirmEmail", { message: "Email does not match" });
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  console.log({ errors });

  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          メールアドレスを入力
        </CredenzaTitle>
        <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]">
          アカウント作成には、受信可能な独自ドメインのメールアドレスや、Gmailアドレスを正確に入力してください。
        </CredenzaDescription>
      </CredenzaHeader>

      <CredenzaBody>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="openassets@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス（確認用）</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="openassets@gmail.com"
                  {...field}
                />
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
          次へ
        </Button>
        <CredenzaClose asChild>
          <Button variant="link">閉じる</Button>
        </CredenzaClose>
      </CredenzaFooter>
    </CredenzaContent>
  );
};
