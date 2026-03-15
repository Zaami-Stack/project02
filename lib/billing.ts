import Stripe from "stripe";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";
import { syncUserPlanFromSubscription } from "@/lib/prompts";

type SubscriptionStatus = Stripe.Subscription.Status;

async function resolveUserIdFromCustomer(customerId: string) {
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) {
    return null;
  }

  return customer.metadata.supabaseUserId ?? null;
}

export async function getOrCreateStripeCustomer({
  userId,
  email
}: {
  userId: string;
  email: string;
}) {
  const supabase = createSupabaseAdminClient();
  const stripe = getStripe();

  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .not("stripe_customer_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data?.stripe_customer_id) {
    return data.stripe_customer_id;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabaseUserId: userId
    }
  });

  return customer.id;
}

export async function upsertStripeSubscription(subscription: Stripe.Subscription) {
  const supabase = createSupabaseAdminClient();
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;

  const userId =
    subscription.metadata.supabaseUserId ??
    subscription.metadata.userId ??
    (await resolveUserIdFromCustomer(customerId));

  if (!userId) {
    throw new Error(`Unable to resolve user for Stripe subscription ${subscription.id}`);
  }

  const status = subscription.status as SubscriptionStatus;

  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status,
      plan: "pro",
      current_period_end: subscription.items.data[0]?.current_period_end
        ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
        : null
    },
    {
      onConflict: "stripe_subscription_id"
    }
  );

  if (error) {
    throw new Error(`Unable to upsert Stripe subscription: ${error.message}`);
  }

  await syncUserPlanFromSubscription(userId);
}

export async function handleStripeCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription" || !session.subscription) {
    return;
  }

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  await upsertStripeSubscription(subscription);
}
