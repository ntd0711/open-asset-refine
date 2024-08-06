import React, { useMemo, useRef } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  onNext: () => void;
};

export const AvatarUpload = (props: Props) => {
  const {
    getValues,
    watch,
    control,
    formState: { errors },
    setValue,
    setError,
    trigger,
  } = useFormContext<CredentialUserSignUp>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const previewUrl = useMemo(() => {
    const file = getValues("profileImage") as Blob;
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [watch("profileImage")]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setValue("profileImage", selectedFile);
      } else {
        setError("profileImage", { message: "Please select an image file." });
        setValue("profileImage", null);
      }
    }
  };

  const handleSubmit = async () => {
    const isValid = await trigger("profileImage");
    const profileImage = getValues("profileImage");
    console.log({ isValid });
    if (!isValid || !profileImage) {
      console.error("profileImage is not available");
      return;
    }
    props.onNext();
  };

  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle className="text-left text-[#212121] text-[20px] font-[600]">
          プロフィール画像を選ぶ
        </CredenzaTitle>
        <CredenzaDescription className="text-left text-[#212121] text-[12px] leading-[21px]">
          お気に入りの画像をアップロードしましょう
        </CredenzaDescription>
      </CredenzaHeader>

      <CredenzaBody className="flex justify-center">
        <FormField
          control={control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>ユーザー名</FormLabel> */}
              <FormControl>
                <>
                  <Avatar
                    className="w-24 h-24 mb-2 cursor-pointer"
                    onClick={handleButtonClick}
                  >
                    {previewUrl ? (
                      <AvatarImage src={previewUrl} alt="Avatar" />
                    ) : (
                      <AvatarFallback>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </svg>
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <input
                    ref={fileInputRef}
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </>
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
          type="submit"
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
