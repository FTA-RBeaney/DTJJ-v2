import { readBody } from "h3";
import Stripe from "stripe";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripeSecretKey =
    config?.stripe?.secretKey || process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret =
    config?.stripe?.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Stripe keys not configured",
    });
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = getHeader(event, "stripe-signature");

  if (!signature) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing stripe-signature header",
    });
  }

  const rawBody = await readRawBody(event);
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret
    );
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook signature verification failed: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Handle the payment_intent.succeeded event
  if (stripeEvent.type === "payment_intent.succeeded") {
    const paymentIntent = stripeEvent.data.object;
    const metadata = paymentIntent.metadata;

    // We need to fetch the full registration data from the database using the email from metadata
    // since we can't store the full registration in Stripe metadata due to size limits
    if (metadata && metadata.email) {
      const supabase = serverSupabaseClient(event);

      // First, try to find if this registration already exists (from the client-side insertion)
      let existingRegistration = null;
      let fetchError = null;

      try {
        const result = await supabase
          .from("registrations")
          .select("*")
          .eq("email", metadata.email)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
        existingRegistration = result.data;
        fetchError = result.error;
      } catch (err) {
        console.error("Error fetching existing registration:", err);
        fetchError = err;
      }

      console.log("Existing registration:", existingRegistration);
      console.log("Fetch error:", fetchError);

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching existing registration:", fetchError);
        throw createError({
          statusCode: 500,
          statusMessage: "Failed to fetch registration data",
        });
      }

      // Also try to find by stripe_payment_id if email lookup fails
      if (!existingRegistration) {
        try {
          const paymentResult = await supabase
            .from("registrations")
            .select("*")
            .eq("stripe_payment_id", paymentIntent.id)
            .single();
          if (!paymentResult.error) {
            existingRegistration = paymentResult.data;
          }
        } catch (err) {
          console.error("Error fetching by payment ID:", err);
        }
      }

      if (existingRegistration) {
        // Update the existing registration with payment information
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            payment_status: "succeeded",
            stripe_payment_id: paymentIntent.id,
            pass_type: metadata.passType,
            name: {
              first: metadata.name?.split(" ")[0] || "",
              last: metadata.name?.split(" ")[1] || "",
            },
            pronouns: metadata.pronouns,
            email: metadata.email,
            city: metadata.city,
            pass: metadata.pass ? JSON.parse(metadata.pass) : null,
            pay_it_forward: metadata.payItForward
              ? JSON.parse(metadata.payItForward)
              : null,
            hosting: metadata.hosting ? JSON.parse(metadata.hosting) : null,
            musician: metadata.musician ? JSON.parse(metadata.musician) : null,
            number_of_guests: metadata.numberOfGuests,
            merch: metadata.merch ? JSON.parse(metadata.merch) : null,
            terms_accepted: metadata.termsAccepted,
            start_year: metadata.optional
              ? JSON.parse(metadata.optional).startYear
              : null,
            travel_method: metadata.optional
              ? JSON.parse(metadata.optional).travelMethod
              : null,
            community: metadata.optional
              ? JSON.parse(metadata.optional).community
              : null,
            submitted_at: new Date().toISOString(),
            volunteering: metadata.volunteering,
          })
          .eq("id", existingRegistration.id);

        if (updateError) {
          console.error(
            "Error updating registration with payment info:",
            updateError
          );
          throw createError({
            statusCode: 500,
            statusMessage: "Failed to update registration with payment info",
          });
        }

        return { success: true, message: "Webhook processed successfully" };
      } else {
        // If no existing registration found, create a minimal one with the metadata we have
        const { error: dbError } = await supabase.from("registrations").insert([
          {
            name: {
              first: metadata.name?.split(" ")[0] || "",
              last: metadata.name?.split(" ")[1] || "",
            },
            pronouns: metadata.pronouns,
            email: metadata.email,
            city: metadata.city,
            pass: metadata.pass ? JSON.parse(metadata.pass) : null,
            pay_it_forward: metadata.payItForward
              ? JSON.parse(metadata.payItForward)
              : null,
            hosting: metadata.hosting ? JSON.parse(metadata.hosting) : null,
            musician: metadata.musician ? JSON.parse(metadata.musician) : null,
            number_of_guests: metadata.numberOfGuests,
            merch: metadata.merch ? JSON.parse(metadata.merch) : null,
            terms_accepted: metadata.termsAccepted,
            start_year: metadata.optional
              ? JSON.parse(metadata.optional).startYear
              : null,
            travel_method: metadata.optional
              ? JSON.parse(metadata.optional).travelMethod
              : null,
            community: metadata.optional
              ? JSON.parse(metadata.optional).community
              : null,
            submitted_at: new Date().toISOString(),
            pass_type: metadata.passType,
            volunteering: metadata.volunteering,
            payment_status: "succeeded",
            stripe_payment_id: paymentIntent.id,
          },
        ]);

        if (dbError) {
          console.error("Error creating minimal registration:", dbError);
          throw createError({
            statusCode: 500,
            statusMessage: "Failed to create registration",
          });
        }

        return {
          success: true,
          message: "Webhook processed successfully with minimal data",
        };
      }
    }
  }

  return { success: true, message: "Webhook received but no action taken" };
});
