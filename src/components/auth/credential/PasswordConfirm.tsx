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

export const PasswordConfirm = (props: Props) => {
  const {
    getValues,
    watch,
    control,
    trigger,
    formState: { errors },
    setError,
  } = useFormContext<CredentialUserSignUp>();

  const handleSubmit = async () => {
    const isValid = await validateEmailFields();
    if (isValid) {
      props.onNext();
    }
  };

  const validateEmailFields = async (): Promise<boolean> => {
    const isValid = await trigger(["password", "confirmPassword"]);
    if (isValid) {
      const emailValue = getValues("password");
      const confirmEmailValue = getValues("confirmPassword");
      if (emailValue !== confirmEmailValue) {
        setError("confirmPassword", { message: "Password does not match" });
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          パスワード入力
        </CredenzaTitle>
        <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]">
          アカウントログイン時に利用するお好みのパスワードを入力してください。
          大文字、記号を含む8文字以上の英数字の組み合わせで強力なパスワードを設定してください。
        </CredenzaDescription>
      </CredenzaHeader>

      <CredenzaBody>
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード（確認用）</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
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
