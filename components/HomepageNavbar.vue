<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
const { logout, fetchUserDetails, userEmail, isUserLoggedIn } = useAuth();
fetchUserDetails();
</script>

<template>
  <header class="z-10 top-0 flex h-16 px-4 justify-between md:px-6 mx-6">
    <nav
      class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm min-w-5xl"
    >
      <NuxtLink to="#" class="flex items-center gap-2 text-base font-semibold">
        <img src="/logo.png" alt="icon" style="max-width: 40px" />
        <h1 class="inter-font text-base">Asisten Pengusaha</h1>
        <span class="sr-only">AP Org</span>
      </NuxtLink>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Layanan untuk UMKM</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
              >
                <li class="row-span-3">
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/"
                    >
                      <img src="/logo.png" class="h-6 w-6" />
                      <div class="mb-2 mt-4 text-lg font-medium">
                        Akademi Pelajar
                      </div>
                      <p class="text-sm leading-tight text-muted-foreground">
                        Asisten Pengusaha untuk UMKM Ekspor, menuju Indonesia
                        Emas 2045!
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>

                <li>
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      to="/dashboard/service"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="flex items-center">
                        <LucideMessageSquareText :size="16" />
                        <h2 class="text-sm font-medium leading-none ml-1">
                          Layanan 24/7
                        </h2>
                      </div>
                      <p
                        class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                      >
                        Sediakan Chatbot AI untuk menjawab pertanyaan pelanggan!
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      to="/dashboard/guide"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="flex items-center">
                        <LucideBookCopy :size="16" />
                        <h2 class="text-sm font-medium leading-none ml-1">
                          Panduan & pelatihan
                        </h2>
                      </div>
                      <p
                        class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                      >
                        Pelajari cara mengekspor dengan simpel, elegan, dan
                        berbobot.
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      to="/dashboard/promotion"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="flex items-center">
                        <LucideTv :size="16" />
                        <h2 class="text-sm font-medium leading-none ml-1">
                          Kampanye Promosi
                        </h2>
                      </div>
                      <p
                        class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                      >
                        Saatnya menunjukkan produkmu di mata dunia!
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>

    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden mt-3"
          style="z-index: 12 !important"
        >
          <LucideMenu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="grid gap-6 text-lg font-medium">
          <NuxtLink
            to="#"
            class="flex items-center gap-2 text-lg font-semibold"
          >
            <img src="/logo.png" alt="icon" width="160" />
            <span class="sr-only">API Org</span>
          </NuxtLink>
        </nav>
      </SheetContent>
    </Sheet>
    <div
      class="flex items-center gap-4 md:gap-2 lg:gap-4"
      style="z-index: 11"
      v-if="isUserLoggedIn"
    >
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <LucideCircleUser class="h-5 w-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{{ userEmail }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <NuxtLink to="/dashboard">
            <DropdownMenuItem> Dashboard </DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/dashboard/settings">
            <DropdownMenuItem> Settings </DropdownMenuItem>
          </NuxtLink>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="flex items-center gap-2" style="z-index: 11" v-else>
      <NuxtLink to="/login">
        <Button variant="outline">Masuk</Button>
      </NuxtLink>
      <NuxtLink to="/register">
        <Button>Daftar</Button>
      </NuxtLink>
    </div>
  </header>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
.inter-font {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
}
</style>
