export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const partyDiscount = config.volunteerPartyDiscount;
  const fullDiscount = config.volunteerFullDiscount;
  let volunteerDiscount = "";

  // get the discount code from the query parameters
  const query = getQuery(event);
  const discountCode = query.code;

  let selectedDiscount = "";

  if (discountCode === partyDiscount) {
    selectedDiscount = "volunteer-party";
  } else if (discountCode === fullDiscount) {
    selectedDiscount = "volunteer-full";
  } else {
    selectedDiscount = "";
  }

  return { selectedDiscount };
});
