import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailConfirm } from "./EmailConfirm";
import { EmailVerify } from "./EmailVerify";
import { PasswordConfirm } from "./PasswordConfirm";
import { NameAndDateOfBirth } from "./NameAndDateOfBirth";
import { AvatarUpload } from "./AvatarUpload";
import { UserIdForm } from "./UserId";
import { CredentialUserSignUpSchema } from "@schemas/auth/register";
import { Credenza } from "@components/auth/Credenza";

type Props = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CredentialUserSignUp = z.infer<typeof CredentialUserSignUpSchema>;

const CredentialUserSignUpModal: FC<Props> = (props) => {
  const { open, onOpenChange } = props;
  const [step, setStep] = useState(1);
  const method = useForm<CredentialUserSignUp>({
    defaultValues: {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      userId: "",
      profileImage: null,
      verificationCode: "",
    },
    resolver: zodResolver(CredentialUserSignUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (open === true) {
      setStep(1);
      method.clearErrors();
      method.reset();
    }
  }, [open]);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  const steps = useMemo(
    () => [
      {
        title: "email",
        content: <EmailConfirm onNext={handleNext} />,
      },
      {
        title: "verify",
        content: <EmailVerify onNext={handleNext} />,
      },
      {
        title: "password",
        content: <PasswordConfirm onNext={handleNext} />,
      },
      {
        title: "info",
        content: <NameAndDateOfBirth onNext={handleNext} />,
      },
      {
        title: "avatar",
        content: <AvatarUpload onNext={handleNext} />,
      },
      {
        title: "userId",
        content: <UserIdForm onSubmit={method.handleSubmit(onSubmit)} />,
      },
    ],
    []
  );

  function handleNext() {
    setStep((prev) => prev + 1);
  }

  function onSubmit(values: CredentialUserSignUp) {
    console.log(values);
  }
  // console.log({ errors: method.formState.errors });
  return (
    <Credenza open={open} onOpenChange={handleOpenChange}>
      <Form {...method}>
        {/* <form onSubmit={method.handleSubmit(onSubmit)}> */}
        {steps[step - 1].content}
        {/* </form> */}
      </Form>
    </Credenza>
  );
};

export default CredentialUserSignUpModal;
