import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const supabaseUrl: string = config.public.supabaseURL;
  const supabaseKey: string = config.public.publicSupabaseKey;

  const supabase: SupabaseClient = createClient(
    supabaseUrl,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ldHZyY3d5dXVsd2Z5b2FxdXlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjI3MTY4NSwiZXhwIjoyMDQ3ODQ3Njg1fQ.Ha1N36v7OPNwHFR8uodnv4fPiYbsSzFF1plLyQLm0qs"
  );

  return {
    provide: {
      supabase,
    },
  };
});
