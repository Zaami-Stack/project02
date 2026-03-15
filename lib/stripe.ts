import Stripe from "stripe";

import { getStripeEnv } from "@/lib/env";

let stripe: Stripe | undefined;

export function getStripe() {
  if (!stripe) {
    const env = getStripeEnv();
    stripe = new Stripe(env.STRIPE_SECRET_KEY);
  }

  return stripe;
}
