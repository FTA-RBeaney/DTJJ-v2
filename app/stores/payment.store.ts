import { defineStore } from "pinia";
import { PASS_TYPES, PIF_OPTIONS } from "@/constants/registerOptions";

export const usePaymentStore = defineStore("payment", () => {
  const exampleValue = ref("example");

  const ticketTypes = PASS_TYPES;

  // Persist and hydrate from localStorage after mount to survive reloads.
  // Default the chosen ticket to the 'Full' ticket when no value exists.
  const chosenTicket = useLocalStorage("chosen-ticket", ticketTypes[0], {
    initOnMounted: true,
  });

  const selectedPayItForward = useLocalStorage(
    "selected-pay-it-forward",
    PIF_OPTIONS[0].id,
    {
      initOnMounted: true,
    }
  );

  const payItForwardAmount = useLocalStorage("pay-it-forward-amount", 0, {
    initOnMounted: true,
  });

  const hostingOption = useLocalStorage(
    "hosting-option",
    {
      label: "I do not need hosting",
      value: "no-hosting",
      icon: "lucide:home",
    },
    {
      initOnMounted: true,
    }
  );

  const registrationData = useLocalStorage(
    "registration-data",
    {},
    {
      initOnMounted: true,
    }
  );

  const setChosenTicket = (ticket: string | null) => {
    if (ticket === null) {
      chosenTicket.value = { label: "None", value: "none", price: 0, icon: "" };
      return;
    }
    const foundTicket = ticketTypes.find((t) => t.value === ticket);
    if (!foundTicket) {
      throw new Error(`Ticket type "${ticket}" not found`);
    }
    console.log(
      `Chosen ticket set to: ${foundTicket.value} at £${foundTicket.price}`
    );
    chosenTicket.value = {
      ...foundTicket,
      tag: foundTicket.tag,
      quantity: foundTicket.quantity,
    };
  };

  const setPayItForward = (id: string, value: number) => {
    const item = PIF_OPTIONS.find((p) => p.id === id);
    if (!item) {
      throw new Error(`Pay-it-forward option "${id}" not found`);
    }
    registrationData.value = {
      ...registrationData.value,
      payItForward: value,
    };
    selectedPayItForward.value = id;
    payItForwardAmount.value = value;
  };

  const setHosting = (option: object) => {
    registrationData.value = {
      ...registrationData.value,
      hosting: hostingOption,
    };

    hostingOption.value = option;
  };

  const setRegistrationData = (data: Record<string, any>) => {
    registrationData.value = { ...registrationData.value, ...data };
  };

  return {
    chosenTicket,
    exampleValue,
    payItForwardAmount,
    selectedPayItForward,
    setChosenTicket,
    setPayItForward,
    ticketTypes,
    registrationData,
    setRegistrationData,
    hostingOption,
    setHosting,
  };
});
