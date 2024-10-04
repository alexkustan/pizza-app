import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const domain = process.env.YOUR_DOMAIN;

  if (!domain) {
    throw new Error("YOUR_DOMAIN is not defined in the environment variables");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd", // Use your appropriate currency
          product_data: {
            name: `Order #${details.orderId}`,
          },
          unit_amount: details.amount * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/cancel`,
    metadata: {
      order_id: details.orderId,
    },
  });

  return session;
}
