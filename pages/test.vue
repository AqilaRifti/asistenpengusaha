<template>
  <div>
    <p v-if="isUserLoggedIn">Welcome, {{ userDisplayName }} ({{ userEmail }})</p>
    <button v-if="isUserLoggedIn" @click="logoutUser">Logout</button>
    <button v-else @click="handleSignUp">Sign Up</button>
    <p v-if="authError" class="error">{{ authError }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';

const { signUp, logout, fetchUserDetails, userEmail, userDisplayName, isUserLoggedIn, authError } = useAuth();
fetchUserDetails()
const email = ref('people@gmail.com');
const password = ref('12345678');
const displayName = ref('Aqila Rifti');
console.log(userEmail.value)
console.log(isUserLoggedIn.value)
const handleSignUp = async () => {
  await signUp(email.value, password.value, displayName.value);
};

const logoutUser = async () => {
  await logout();
};
</script>
