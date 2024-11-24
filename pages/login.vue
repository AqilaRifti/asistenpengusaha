<script setup lang="ts">
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const { passwordAuthLogin } = useAuth()

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
          <Button @click="passwordAuthLogin(email, password)" class="w-full"> Login </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register" class="underline"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </article>
</template>
