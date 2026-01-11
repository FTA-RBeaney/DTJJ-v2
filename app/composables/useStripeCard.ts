import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import type { Stripe, StripeCardElement } from "@stripe/stripe-js";

export function useStripeCard(cardEl: Ref<HTMLElement | null>) {
  const stripe = ref<Stripe | null>(null);
  const card = ref<StripeCardElement | null>(null);
  const error = ref<string | null>(null);
  const ready = ref(false);
  const cardComplete = ref(false);
  const cardError = ref<string | null>(null);

  // use the nuxt-stripe composable provided by the module
  const { loadStripe: moduleLoadStripe, stripe: moduleStripe } =
    useClientStripe();

  onMounted(async () => {
    try {
      let _stripe: any = moduleStripe.value;
      if (!_stripe) _stripe = await moduleLoadStripe();
      if (!_stripe) {
        error.value = "Stripe failed to load";
        return;
      }
      stripe.value = _stripe as Stripe;
      const elements = (stripe.value as any).elements();
      card.value = elements.create("card", { hidePostalCode: true });
      if (cardEl.value && card.value) card.value.mount(cardEl.value);
      // track completeness and errors from the Stripe Card element
      const handleChange = (ev: any) => {
        cardComplete.value = !!ev.complete;
        cardError.value = ev.error ? ev.error.message : null;
      };
      (card.value as any).on("change", handleChange);
      ready.value = true;
    } catch (e: any) {
      error.value = e?.message || String(e);
    }
  });

  onBeforeUnmount(() => {
    if (card.value && (card.value as any).off) {
      (card.value as any).off("change");
    }
    if (card.value && (card.value as any).unmount) {
      (card.value as any).unmount();
    }
  });

  return { stripe, card, ready, error, cardComplete, cardError };
}
