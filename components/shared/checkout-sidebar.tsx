import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui";

interface Props {
  className?: string;
  totalAmount: number;
}
const TAX = 15;
const DELIVERY_PRICE = 3.99;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount }) => {
  const taxPrice = (totalAmount * TAX) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + taxPrice;
  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total</span>
        <span className="text-[34px] font-extrabold">{totalPrice} $</span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package className="mr-2 text-gray-300" size={18} />
            cost of items:
          </div>
        }
        value={`${totalAmount} $`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent className="mr-2 text-gray-300" size={18} />
            tax:
          </div>
        }
        value={`${taxPrice} $`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck className="mr-2 text-gray-300" size={18} />
            delivery fee:
          </div>
        }
        value={`${DELIVERY_PRICE} $`}
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        proceed to payment
        <ArrowRight className="w-5 m-2" />
      </Button>
    </WhiteBlock>
  );
};