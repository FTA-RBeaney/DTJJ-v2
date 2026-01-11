export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { email, name, passType } = body;

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
    });
  }

  const confirmUrl = `https://your-site.com/confirm?email=${encodeURIComponent(
    email
  )}`;

  const response = await $fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: {
      sender: {
        email: "info@downtownjazzjam.uk",
        name: "Downtown Jazz Jam",
      },
      to: [
        {
          email,
          name,
        },
      ],
      subject: "Registration complete!",
      htmlContent: `
        <h2>Welcome${name ? `, ${name}` : ""} 👋</h2>
        <p>Thanks for signing up to the Downtown Jazz Jam 2026.</p>
        <p>Your registration has been received and is confirmed!</p>
      <p>${passType}</p>
        <p>
          <a href="${confirmUrl}">
            Confirm my account
          </a>
        </p>
      `,
    },
  });

  return {
    success: true,
    brevoResponse: response,
  };
});
