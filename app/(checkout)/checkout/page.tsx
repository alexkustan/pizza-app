import { CheckoutItemDetails } from "@/components/shared/checkout-item-details";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { WhiteBlock } from "@/components/shared/white-block";
import { Button, Input, Textarea } from "@/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function checkoutPage() {
  return (
    <Container className="mt-10">
      <Title
        text="Placing an order"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart"></WhiteBlock>

          <WhiteBlock title="2. Personal Information">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="First name"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Last name"
              />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input
                name="phone"
                className="text-base"
                placeholder="Phone number"
              />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Delivery address">
            <div className="flex flex-col gap-5">
              <Input
                name="deliveryplace"
                className="text-base"
                placeholder="Delivery place"
              />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Please provide additional information for the courier here."
              />
            </div>
          </WhiteBlock>
        </div>

        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total</span>
              <span className="text-[34px] font-extrabold">14 $</span>
            </div>
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package className="mr-2 text-gray-300" size={18} />
                  cost of items:
                </div>
              }
              value="10 $"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent className="mr-2 text-gray-300" size={18} />
                  tax:
                </div>
              }
              value="1 $"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck className="mr-2 text-gray-300" size={18} />
                  delivery fee:
                </div>
              }
              value="3 $"
            />
            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              proceed to payment
              <ArrowRight className="w-5 m-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
