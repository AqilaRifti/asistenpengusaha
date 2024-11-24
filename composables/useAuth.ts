import { useState, useRouter } from "#app";
import { createClient } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";

const supabaseURL = "https://metvrcwyuulwfyoaquyi.supabase.co";
const privateSupabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ldHZyY3d5dXVsd2Z5b2FxdXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNzE2ODUsImV4cCI6MjA0Nzg0NzY4NX0.aTiFdjej6wMyGhrxr7ihoogbZ24Y-wvGgKotmM8hM1Q";
// @ts-ignore
const supabase = createClient(supabaseURL, privateSupabaseKey);

export const useAuth = () => {
  const userEmail = useState<string | null>("userEmail", () => null);
  const userDisplayName = useState<string | null>(
    "userDisplayName",
    () => null
  );
  const isUserLoggedIn = useState<boolean>("isUserLoggedIn", () => false);
  const authError = useState<string | null>("authError", () => null);
  const logoutError = useState<string | null>("logoutError", () => null);
  const router = useRouter();

  const fetchUserDetails = async (): Promise<void> => {
    const {
      data: { session },
      error,
    }: { data: { session: Session | null }; error: Error | null } =
      await supabase.auth.getSession();

    if (error) {
      authError.value = error.message;
      console.error("Error fetching session:", authError.value);
    } else if (session?.user) {
      userEmail.value = session.user.email || null;
      userDisplayName.value = session.user.user_metadata.displayName;
      isUserLoggedIn.value = true;
    } else {
      userEmail.value = null;
      userDisplayName.value = null;
      isUserLoggedIn.value = false;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    authError.value = null;
    try {
      const { error: signUpError } = await supabase.auth.signUp({
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

  const passwordAuthLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    authError.value = null;
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
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

  const logout = async (): Promise<void> => {
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      logoutError.value = signOutError.message;
      console.error("Sign out error:", logoutError.value);
    } else {
      userEmail.value = null;
      userDisplayName.value = null;
      isUserLoggedIn.value = false;
      await router.push("/login");
    }
  };
  return {
    userEmail,
    userDisplayName,
    isUserLoggedIn,
    authError,
    logoutError,
    fetchUserDetails,
    signUp,
    logout,
    passwordAuthLogin,
  };
};
