import { useSupabaseClient } from "#imports";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const client = useSupabaseClient();
  // Persist and hydrate from localStorage after mount to survive reloads.
  const userId = useLocalStorage("user-id", null, { initOnMounted: true });
  const profile = useLocalStorage("user-profile", null, {
    initOnMounted: true,
  });

  async function fetchProfile(id, forceRefresh = false) {
    // If profile already exists for this user and we're not forcing a refresh, skip the fetch
    if (!forceRefresh && profile.value && userId.value === id) {
      console.log("Profile loaded from cache");
      return profile.value;
    }

    userId.value = id;

    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      profile.value = data;
      console.log("Profile fetched successfully");
    }

    return profile.value;
  }

  const attendee = useLocalStorage(
    "user-attendee",
    {
      pronouns: "",
      signedUp: "01-12-2025",
      passType: "Full",
      role: "Lead",
      volunteering: false,
      hostingStatus: "Being hosted",
      team: "raspberry",
    },
    { initOnMounted: true }
  );

  function updateAttendee(data) {
    attendee.value = { ...attendee.value, ...data };
  }

  function resetUserData() {
    userId.value = null;
    profile.value = null;
    attendee.value = {
      signedUp: "01-12-2025",
      passType: "Full pass",
      role: "Lead",
      volunteering: false,
      hostingStatus: "Being hosted",
      team: "raspberry",
    };
  }

  return {
    userId,
    profile,
    attendee,
    fetchProfile,
    updateAttendee,
    resetUserData,
  };
});
