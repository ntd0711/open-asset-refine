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
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { type CredentialUserSignUp } from "./CredentialUserSignUpModal";

type Props = {
  onSubmit: () => void;
};

export const UserIdForm: FC<Props> = (props) => {
  const {
    getValues,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useFormContext<CredentialUserSignUp>();
  const handleSubmit = async () => {
    const isValid = await trigger("userId");
    if (!isValid) return;
    props.onSubmit();
  };
  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          ユーザーIDを新しく作成
        </CredenzaTitle>
        <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]">
          Open
          Threadsで使われるIDです。英数字のみ使用できます。すでに使われているものは設定できません。後から変更することもできます。
        </CredenzaDescription>
      </CredenzaHeader>
      <CredenzaBody>
        <FormField
          control={control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザーIDの入力</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CredenzaBody>
      <CredenzaFooter>
        <Button
          type="submit"
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
