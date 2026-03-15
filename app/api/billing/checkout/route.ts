import { NextResponse } from "next/server";

import { getBaseEnv, getStripeEnv } from "@/lib/env";
import { getCurrentUser } from "@/lib/auth";
import { getOrCreateStripeCustomer } from "@/lib/billing";
import { getUserProfile } from "@/lib/prompts";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  }

  const baseEnv = getBaseEnv();
  const stripeEnv = getStripeEnv();
  const stripe = getStripe();
  const profile = await getUserProfile(user.id);
  const customerId = await getOrCreateStripeCustomer({
    userId: user.id,
    email: profile.email
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    payment_method_types: ["card"],
    line_items: [
      {
        price: stripeEnv.STRIPE_PRO_PRICE_ID,
        quantity: 1
      }
    ],
    allow_promotion_codes: true,
    success_url: `${baseEnv.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${baseEnv.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancelled`,
    metadata: {
      supabaseUserId: user.id
    },
    subscription_data: {
      metadata: {
        supabaseUserId: user.id,
        userId: user.id
      }
    }
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
