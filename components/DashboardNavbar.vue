<script setup lang="ts">
const supabase: any = useNuxtApp().$supabase;

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
colorMode.preference = "dark"
const userEmail = ref<string | null>(null)
const UserDisplayName = ref<string | null>(null)

const logoutError = ref<string | null>(null)
const getUserEmailError = ref<string | null>(null)
const getUserDisplayNameError = ref<string | null>(null)

const currentPage = ref(route.fullPath.split("/").at(2))

watch(route, _value => {
    currentPage.value = route.fullPath.split("/").at(2)
  }, 
  {
    deep: true, 
    immediate: true
  }
)


async function logout() {
  const { error: signOutError } = await supabase.auth.signOut()

  if (signOutError) {
    logoutError.value = signOutError.message
    console.error('Sign out error:', logoutError.value)
  } else {
    await router.push('/login')
  }
}

async function getUserEmail() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    getUserEmailError.value = sessionError.message
    console.error('Error fetching session:', getUserEmailError.value)
  } else if (session?.user) {
    userEmail.value = session.user.email 
  } else {
    userEmail.value = null
  }
}
async function getUserDisplayName() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  console.log(session)
  if (sessionError) {
    getUserDisplayNameError.value = sessionError.message
    console.error('Error fetching session:', getUserDisplayNameError.value)
  } else if (session?.user) {
    UserDisplayName.value = session.user.user_metadata.displayName
  } else {
    UserDisplayName.value = null
  }
}
getUserDisplayName()

</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NuxtLink
          to="#"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img src="/logo.png" alt="icon" />
          <span class="sr-only">API Org</span>
        </NuxtLink>
        <NuxtLink
          to="/dashboard"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === undefined)}]"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/dashboard/tasks"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === 'tasks')}]"
        >
          Market
        </NuxtLink>
        <NuxtLink
          to="/dashboard/notes"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === 'notes')}]"
        >
          Produk
        </NuxtLink>
        <NuxtLink
          to="/dashboard/chats"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === 'chats')}]"
        >
          Pelatihan
        </NuxtLink>
        <NuxtLink
          to="/dashboard/tests"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === 'tests')}]"
        >
          Tests
        </NuxtLink>
        <NuxtLink
          to="/dashboard/forums"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === 'forums')}]"
        >
          Forums
        </NuxtLink>
        <NuxtLink
          to="/dashboard/analysis"
          :class="['text-foreground transition-colors hover:text-foreground', {'text-muted-foreground': !(currentPage === 'analysis')}]"
        >
          Analysis
        </NuxtLink>
      </nav>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DashboardCommand />
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline">
                    <LucideMoon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <LucideSun class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem @click="colorMode.preference = 'light'">
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'dark'">
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'system'">
                    System
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="secondary" size="icon" class="rounded-full">
                <LucideCircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{{ UserDisplayName }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
</template>
