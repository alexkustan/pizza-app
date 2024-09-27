"use client";

import { CheckoutItem } from "@/components/shared/checkout-item";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { WhiteBlock } from "@/components/shared/white-block";
import { Input, Textarea } from "@/components/ui";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useCart } from "@/hooks/use-cart";
import { getCartItemDetails } from "@/lib/get-cart-item-details";

export default function checkoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Placing an order"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

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
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
