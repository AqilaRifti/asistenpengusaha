<script setup lang="ts">
definePageMeta({
  middleware: 'protectauth',
});
import { useToast } from "@/components/ui/toast/use-toast";
const supabase: any = useNuxtApp().$supabase;
const displayName = ref("");
const email = ref("");
const password = ref("");
const error: Ref<undefined | string> = ref(undefined);
const router = useRouter();
const { toast } = useToast();

async function signUp() {
  error.value = undefined;
  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          displayName: displayName.value,
        },
      },
    });

    if (signUpError) {
      error.value = signUpError.message;
      toast({
        title: "Uh Oh, Something went wrong!",
        description: error.value,
        variant: "destructive"
      });
    } else {
      router.push("/dashboard");
    }
  } catch (err: any) {
    error.value = err.message;
    toast({
      title: "Uh Oh, Something went wrong!",
      description: error.value,
      variant: "destructive"
    });
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
        <CardTitle class="text-xl"> Register </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="first-name">Name</Label>
            <Input
              v-model="displayName"
              id="first-name"
              placeholder="Max Robinson"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              v-model="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input v-model="password" id="password" type="password" />
          </div>
          <Button type="submit" @click="signUp" class="w-full">
            Create an account
          </Button>
          <Button variant="outline" class="w-full">
            <LucideGithub class="w-6 h-4" />
            Register with GitHub
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/login" class="underline"> Sign in </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </article>
</template>
