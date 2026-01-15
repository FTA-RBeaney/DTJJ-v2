import { readBody } from "h3"; // Nuxt server helpers
import Stripe from "stripe";

// Server API that creates a PaymentIntent using the Stripe SDK and runtime config
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const amount = body?.amount ?? 5000; // amount in smallest currency unit (e.g. cents)
  const currency = body?.currency ?? "eur";

  const config = useRuntimeConfig();
  const secret = config?.stripe?.secretKey || process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Stripe secret key not configured",
    });
  }

  const stripe = new Stripe(secret);

  // Create a minimal metadata object to stay within Stripe's 500 character limit
  const minimalMetadata: Record<string, string> = body.registration
    ? {
        email: body.registration.email || "",
        passType: body.registration.passType || "",
        name: `${body.registration.name.first || ""} ${body.registration.name.last || ""}`.trim(),
        pronouns: body.registration.pronouns || "",
        city: body.registration.city || "",
        pass: JSON.stringify(body.registration.pass || {}),
        payItForward: JSON.stringify(body.registration.payItForward || {}),
        hosting: JSON.stringify(body.registration.hosting || {}),
        musician: JSON.stringify(body.registration.musician || {}),
        numberOfGuests: body.registration.numberOfGuests,
        merch: JSON.stringify(body.registration.merch || {}),
        termsAccepted: body.registration.termsAccepted
          ? body.registration.termsAccepted.toString()
          : "",
        optional: JSON.stringify(body.registration.optional || {}),
        volunteering: body.registration.volunteering
          ? body.registration.volunteering.toString()
          : "",
      }
    : {};

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: minimalMetadata,
  });

  return { clientSecret: paymentIntent.client_secret };
});
