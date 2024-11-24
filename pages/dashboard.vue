<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
const { fetchUserDetails, isUserLoggedIn, userEmail } = useAuth();
const route = useRoute();

function capitalizeFirstLetter(string: string | undefined): string {
  // @ts-ignore
  return string.charAt(0).toUpperCase() + string.slice(1);
}

fetchUserDetails()
if (!isUserLoggedIn) {
    navigateTo("/login")
}

useHead({
  title: `AP | ${capitalizeFirstLetter(route.fullPath.split("/").at(-1))}`,
});
watch(
  route,
  (_value) => {
    useHead({
      title: `AP | ${capitalizeFirstLetter(route.fullPath.split("/").at(-1))}`,
    });
  },
  { deep: true, immediate: true }
);
const layout = "dashboard";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
