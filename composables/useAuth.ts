import { useState, useRouter } from "#app";
import type { Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  // States for user details
  const userEmail = useState<string | null>("userEmail", () => null);
  const userDisplayName = useState<string | null>(
    "userDisplayName",
    () => null
  );
  const userID = useState<string | null>("userID", () => null); // New state for user ID
  const isUserLoggedIn = useState<boolean>("isUserLoggedIn", () => false);
  const authError = useState<string | null>("authError", () => null);
  const logoutError = useState<string | null>("logoutError", () => null);
  const router = useRouter();

  // Fetch the current user's details from the session
  const fetchUserDetails = async (): Promise<void> => {
    const {
      data: { session },
      error,
    }: { data: { session: Session | null }; error: Error | null } =
      await $supabase.auth.getSession();

    if (error) {
      authError.value = error.message;
      console.error("Error fetching session:", authError.value);
    } else if (session?.user) {
      // Set user-related data in the state
      userEmail.value = session.user.email || null;
      userDisplayName.value = session.user.user_metadata.displayName;
      userID.value = session.user.id; // Set the userID from the session
      isUserLoggedIn.value = true;
      console.log("User ID:", userID.value); // Log the user ID
    } else {
      // Reset user-related data if session is not found
      userEmail.value = null;
      userDisplayName.value = null;
      userID.value = null; // Reset userID
      isUserLoggedIn.value = false;
    }
  };

  // Sign up a new user
  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    authError.value = null;
    try {
      const { error: signUpError } = await $supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName,
          },
        },
      });

      if (signUpError) {
        authError.value = signUpError.message;
        console.error("Sign-up error:", authError.value);
      } else {
        await router.push("/dashboard");
      }
    } catch (err: any) {
      authError.value = err.message;
      console.error("Sign-up error:", authError.value);
    }
  };

  // Login using email and password
  const passwordAuthLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    authError.value = null;
    try {
      const { error: signInError } = await $supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        authError.value = signInError.message;
        console.error("Login error:", authError.value);
      } else {
        await fetchUserDetails(); // Refresh user details after login
        await router.push("/dashboard");
      }
    } catch (err: any) {
      authError.value = err.message;
      console.error("Login error:", authError.value);
    }
  };

  // Logout the user
  const logout = async (): Promise<void> => {
    const { error: signOutError } = await $supabase.auth.signOut();

    if (signOutError) {
      logoutError.value = signOutError.message;
      console.error("Sign out error:", logoutError.value);
    } else {
      // Reset user-related states on logout
      userEmail.value = null;
      userDisplayName.value = null;
      userID.value = null; // Reset userID on logout
      isUserLoggedIn.value = false;
      await router.push("/login");
    }
  };

  return {
    userEmail,
    userDisplayName,
    userID, // Return the userID
    isUserLoggedIn,
    authError,
    logoutError,
    fetchUserDetails,
    signUp,
    logout,
    passwordAuthLogin,
  };
};
