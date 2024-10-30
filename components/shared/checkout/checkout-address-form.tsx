"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { FormTextarea } from "../form/form-textarea";
import { Input } from "@/components/ui";
import { FormInput } from "../form/form-input";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <div className="grid grid-cols-2 gap-5">
                <FormInput
                  onChange={field.onChange}
                  name="city"
                  className="text-base"
                  placeholder="City"
                />
                <FormInput
                  onChange={field.onChange}
                  name="addres"
                  className="text-base"
                  placeholder="Street and house number"
                />
              </div>
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
