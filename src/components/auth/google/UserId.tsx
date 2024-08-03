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
} from "@/components/ui/credenza";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import React, { FC } from "react";
import { GoogleUserSignUp } from "./GoogleUserSignUpModal";
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

type Props = {
  onSubmit: () => void;
};

export const UserIdForm: FC<Props> = (props) => {
  const {
    getValues,
    watch,
    control,
    formState: { errors },
  } = useFormContext<GoogleUserSignUp>();
  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          ユーザーIDを新しく作成
        </CredenzaTitle>
        <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]">
          Open
          Threadsで使われるアドレスです。英数字のみ使用できます。すでに使われているものは設定できません。後から変更することもできます。
        </CredenzaDescription>
      </CredenzaHeader>
      <CredenzaBody>
        <FormField
          control={control}
          name="userId"
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
        <Button onClick={props.onSubmit}>次へ</Button>
        <CredenzaClose asChild>
          <Button variant="link">閉じる</Button>
        </CredenzaClose>
      </CredenzaFooter>
    </CredenzaContent>
  );
};
