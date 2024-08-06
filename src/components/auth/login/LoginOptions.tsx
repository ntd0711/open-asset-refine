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

type Props = {};

export const LoginOptions: FC<Props> = (props) => {
  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          Open Threadsにログイン
        </CredenzaTitle>
        {/* <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]"></CredenzaDescription> */}
      </CredenzaHeader>

      <CredenzaBody>
        <Button className="bg-[##FFFFFF] hover:bg-[##FFFFFF] w-full leading-[21px] text-[15px] text-[#212121]">
          Googleでログイン
        </Button>
        {/* <Box>

        <Input type="email" />
        </Box> */}
      </CredenzaBody>
      <CredenzaFooter>
        <Button className="bg-[#1976D2] hover:bg-[#1976D2]">ログイン</Button>
        <CredenzaClose asChild>
          <Button variant="link">アカウントをお持ちでない場合は新規登録</Button>
        </CredenzaClose>
      </CredenzaFooter>
    </CredenzaContent>
  );
};
