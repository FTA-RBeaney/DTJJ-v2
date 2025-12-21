<template>
  <div class="flex h-screen items-center justify-between bg-white">
    <div class="w-full md:w-1/2">
      <div class="mx-auto w-full max-w-[330px] px-5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
        <p class="text-muted-foreground mt-1">
          Enter your email & password to log in.
        </p>

        <form class="mt-10" @submit.prevent="signInWithEmail">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <div>
              <UiVeeInput
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
              />
            </div>
            <!-- <div>
              <UiVeeInput label="Password" type="password" name="password" />
            </div> -->
            <div>
              <UiButton
                class="w-full"
                type="submit"
                text="Log in"
                @click="signInWithEmail"
              />
            </div>
            <UiDivider label="OR" />
            <UiButton
              variant="outline"
              type="button"
              @click="signInWithOAuth()"
            >
              <Icon class="size-4" name="logos:google-icon" />
              <span class="ml-2">Continue with Google</span>
            </UiButton>
          </fieldset>
        </form>
        <p class="mt-8 text-sm">
          <NuxtLink
            class="text-primary font-semibold underline-offset-2 hover:underline"
            to="#"
          >
            Forgot password?
          </NuxtLink>
        </p>
        <p class="text-muted-foreground mt-4 text-sm">
          Don't have an account?
          <NuxtLink
            class="text-primary font-semibold underline-offset-2 hover:underline"
            to="#"
          >
            Create account
          </NuxtLink>
        </p>
      </div>
    </div>
    <div class="hidden h-screen md:block md:w-1/2 lg:w-1/2">
      <img
        src="https://res.cloudinary.com/dgbn0ttzf/image/upload/v1763947944/DTJJ_-_FB_Cover_hstthn.png"
        alt="Login form image"
        class="size-full object-cover"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
import type { InferType } from "yup";

definePageMeta({
  layout: "fullscreen",
});

useSeoMeta({
  title: "Log in",
  description: "Enter your email & password to log in.",
});

const LoginSchema = object({
  email: string().email().required().label("Email"),
  // password: string().required().label("Password").min(8),
});

const { isSubmitting } = useForm<InferType<typeof LoginSchema>>({
  validationSchema: LoginSchema,
});

const supabase = useSupabaseClient();

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
};

const signInWithEmail = async () => {
  navigateTo("/account");
};
</script>
