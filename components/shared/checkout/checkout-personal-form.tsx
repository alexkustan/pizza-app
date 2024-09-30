import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form/form-input";
interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="first name"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="last name"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput
          name="phone"
          className="text-base"
          placeholder="phone number"
        />
      </div>
    </WhiteBlock>
  );
};
