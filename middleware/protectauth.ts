// @ts-nocheck

import { useAuth } from "~/composables/useAuth";
const { fetchUserDetails, isUserLoggedIn, userDisplayName } = useAuth();

export default defineNuxtRouteMiddleware(async () => {
    console.log("hello")

    console.log(isUserLoggedIn.value);
    console.log(userDisplayName.value);


  if (isUserLoggedIn.value) {
    console.log("called")
    navigateTo("/dashboard");
  }
});
