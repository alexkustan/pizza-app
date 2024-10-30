import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({}) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <FormProvider>
      <form></form>
    </FormProvider>
  );
};
