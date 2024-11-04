<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
const supabase: any = useNuxtApp().$supabase;
const router = useRouter();

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const error: Ref< undefined | string> = ref(undefined);
const { toast } = useToast();

async function GitHubAuthLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.error("Error with GitHub authentication:", error);
  } else {
    console.log("User authenticated with GitHub successfully");
  }
}

async function passwordAuthLogin() {
  console.log("called");
  error.value = undefined;
  try {
    const { error: signUpError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (signUpError) {
      error.value = signUpError.message;
      toast({
        title: "Uh Oh, Something went wrong!",
        description: error.value,
        variant: "destructive",
      });
    } else {
      router.push("/dashboard");
    }
  } catch (err: any) {
    toast({
      title: "Uh Oh, Something went wrong!",
      description: error.value,
      variant: "destructive",
    });
    error.value = err.message;
  }
}
</script>

<template>
  <Toaster />
  <article
    class="flex justify-center justify-items-center items-center min-h-screen"
  >
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              v-model="email"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" v-model="password" required />
          </div>
          <Button @click="passwordAuthLogin" class="w-full"> Login </Button>
          <Button @click="GitHubAuthLogin" variant="outline" class="w-full">
            <LucideGithub class="w-6 h-4" />
            Login with GitHub
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register" class="underline"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </article>
</template>
