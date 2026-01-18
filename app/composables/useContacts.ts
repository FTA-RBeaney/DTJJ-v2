export const useContacts = () => {
  const countries = useCountries();

  const { data: dtjj_registrations } = useFetch(
    "https://api.brevo.com/v3/contacts?limit=1000&offset=0&sort=desc",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
    }
  );

  const registeredCountries = computed(() => {
    const uniqueLocations = [
      ...new Set(
        dtjj_registrations.value?.contacts.map((i) => i.attributes.LOCATION)
      ),
    ];
    return uniqueLocations
      .map((location) => {
        const country = countries.find((c) => c.name === location);
        const count = dtjj_registrations.value?.contacts.filter(
          (i) => i.attributes.LOCATION === location
        ).length;
        return { id: country?.code, name: country?.name, value: count };
      })
      .filter(Boolean);
  });

  const registrationsByMonth = computed(() => {
    // format data into registrations per month
    const registrations = dtjj_registrations.value?.contacts || [];
    const dataByMonth: any = {};

    // Sort registrations by timestamp first
    const sortedRegistrations = registrations.sort(
      (a: any, b: any) =>
        new Date(a.attributes.CREATED_AT) - new Date(b.attributes.CREATED_AT)
    );

    sortedRegistrations.forEach((reg) => {
      const timestamp = new Date(reg.attributes.CREATED_AT);

      // Format time to month granularity (YYYY-MM)
      const year = timestamp.getFullYear();
      const month = String(timestamp.getMonth() + 1).padStart(2, "0");

      const formattedMonth = `${month}-${year}`;

      // Initialize month if it doesn't exist
      if (!dataByMonth[formattedMonth]) {
        dataByMonth[formattedMonth] = 0;
      }

      // Increment count for this month
      dataByMonth[formattedMonth]++;
    });

    // Convert to array and sort by timestamp
    return Object.entries(dataByMonth)
      .sort(([time1], [time2]) => new Date(time1) - new Date(time2))
      .map(([time, count]) => ({
        time: time,
        amount: count,
      }));
  });

  const registrationsByDay = computed(() => {
    const registrations = dtjj_registrations.value?.contacts || [];
    const dataByDay: any = {};

    // Sort registrations by timestamp first
    const sortedRegistrations = registrations.sort(
      (a: any, b: any) =>
        new Date(a.attributes.CREATED_AT) - new Date(b.attributes.CREATED_AT)
    );

    sortedRegistrations.forEach((reg) => {
      const timestamp = new Date(reg.attributes.CREATED_AT);

      // Format time to day granularity (YYYY-MM-DD)
      const year = timestamp.getFullYear();
      const month = String(timestamp.getMonth() + 1).padStart(2, "0");
      const day = String(timestamp.getDate()).padStart(2, "0");

      const formattedDay = `${day}-${month}-${year}`;

      // Initialize day if it doesn't exist
      if (!dataByDay[formattedDay]) {
        dataByDay[formattedDay] = 0;
      }

      // Increment count for this day
      dataByDay[formattedDay]++;
    });

    // Convert to array and sort by timestamp
    return Object.entries(dataByDay)
      .sort(([time1], [time2]) => new Date(time1) - new Date(time2))
      .map(([time, count]) => ({
        time: time,
        amount: count,
      }));
  });

  const addContact = async (contactData: any) => {
    const { data, error } = await useFetch("/api/brevo/contacts", {
      method: "POST",
      body: {
        email: contactData.email,
        attributes: {
          FIRSTNAME: contactData.attributes.FIRSTNAME,
          LASTNAME: contactData.attributes.LASTNAME,
          LOCATION: contactData.attributes.LOCATION,
        },
      },
    });

    return { data, error };
  };

  return {
    dtjj_registrations,
    registeredCountries,
    registrationsByMonth,
    registrationsByDay,
    addContact,
  };
};
