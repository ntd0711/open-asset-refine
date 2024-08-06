import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Credenza } from "@components/auth/Credenza";
import { LoginOptions } from "./LoginOptions";

type Props = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginModal: FC<Props> = (props) => {
  const { open, onOpenChange } = props;
  const [step, setStep] = useState(1);
  const method = useForm<any>({
    // resolver: zodResolver(CredentialUserSignUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // useEffect(() => {
  //   if (open === true) {
  //     setStep(1);
  //     method.clearErrors();
  //     method.reset();
  //   }
  // }, [open]);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  const steps = useMemo(
    () => [
      {
        id: 1,
        content: <LoginOptions />,
      },
      {
        id: 2,
        content: <></>,
      },
    ],
    []
  );

  function handleNext() {
    setStep((prev) => prev + 1);
  }

  function onSubmit(values: any) {
    console.log(values);
  }
  // console.log({ errors: method.formState.errors });
  return (
    <Credenza open={open} onOpenChange={handleOpenChange}>
      {steps[step - 1].content}
    </Credenza>
  );
};
