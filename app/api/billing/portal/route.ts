import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth";
import { getOrCreateStripeCustomer } from "@/lib/billing";
import { getBaseEnv } from "@/lib/env";
import { getUserProfile } from "@/lib/prompts";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  }

  const env = getBaseEnv();
  const stripe = getStripe();
  const supabase = createSupabaseAdminClient();
  const profile = await getUserProfile(user.id);

  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .not("stripe_customer_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const customerId =
    data?.stripe_customer_id ??
    (await getOrCreateStripeCustomer({
      userId: user.id,
      email: profile.email
    }));

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard`
  });

  return NextResponse.redirect(session.url, { status: 303 });
}
