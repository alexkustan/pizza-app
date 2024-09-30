"use server";

import { OrderConfirmationTemplate } from "@/components/shared/email-templates/order-confirmation-template";
import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
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

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      OrderConfirmationTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl:
          "https://resend.com/api-keys/a8c1ea80-1993-4692-b553-57906c7bc839",
      })
    );

    return;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
  }
}
