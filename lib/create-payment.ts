import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface Props {}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1Q4m2iEYyEDRQSSTZXgpD9Uw", // Use your price ID
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.get("origin")}/?success=true`,
        cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      });

      return NextResponse.redirect(session.url as string, 303);
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
