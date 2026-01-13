export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not set in environment variables");
    throw createError({
      statusCode: 500,
      statusMessage: "BREVO_API_KEY environment variable is missing",
    });
  }

  // Mask key for logging (show first 4 and last 4 chars only)
  const maskedKey = `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
  console.info(`Using BREVO_API_KEY: ${maskedKey}`);
  console.info(
    "Brevo request payload:",
    JSON.stringify({
      email: body.email,
      attributes: body.attributes,
      listIds: [3],
      updateEnabled: false,
    })
  );

  try {
    const response = await $fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: {
        email: body.email,
        attributes: {
          FIRSTNAME: body.attributes.FIRSTNAME,
          LASTNAME: body.attributes.LASTNAME,
          LOCATION: body.attributes.LOCATION,
          CREATED_AT: new Date().toISOString(),
        },
        listIds: [3],
        updateEnabled: false,
      },
    });

    console.info("Brevo response (success):", JSON.stringify(response));
    return response;
  } catch (error: any) {
    // Try to print any nested fields on the error object to help debugging
    try {
      console.error(
        "Brevo API error (raw):",
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
    } catch (e) {
      console.error("Brevo API error (toString):", String(error));
    }

    // If $fetch produced a structured response, include it
    const status = error?.status || 500;
    const message =
      error?.data?.message ||
      error?.message ||
      "Failed to add contact to Brevo";
    throw createError({
      statusCode: status,
      statusMessage: message,
      data: error?.data || error,
    });
  }
});
