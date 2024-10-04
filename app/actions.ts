"use server";

import { prisma } from "@/prisma/prisma-client";
import { OrderConfirmationTemplate } from "@/components/shared/email-templates/order-confirmation-template";
import { sendEmail } from "@/lib/send-email";
import { createPayment } from "@/lib/create-payment";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { CheckoutFormValues } from "@/constants/checkout-form-schema";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart || userCart.totalAmount === 0) {
      throw new Error("Cart is empty or not found");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Clear the cart
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });
    await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } });

    const priceCalc = order.totalAmount;

    // Create a Stripe payment
    const paymentSession = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: `Payment for Order #${order.id}`,
    });

    if (!paymentSession) {
      throw new Error("Payment session not created");
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentSession.id },
    });

    // Send confirmation email with the payment URL
    await sendEmail(
      data.email,
      `Payment for Order #${order.id}`,
      OrderConfirmationTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentSession.url!,
      })
    );

    return paymentSession.url;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
    throw new Error("Order creation failed");
  }
}
