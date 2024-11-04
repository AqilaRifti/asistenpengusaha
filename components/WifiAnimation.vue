<!-- components/WifiAnimation.vue -->
<template>
  <div class="wifi-icons">
    <svg
      v-for="(icon, i) in icons"
      :key="i"
      :class="['wifi-icon', { active: i === iconSequence[currentIndex] }]"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <template v-if="i === 0">
        <path d="M12 20h.01" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </template>
      <template v-else-if="i === 1">
        <path d="M12 20h.01" />
        <path d="M5 12.859a10 10 0 0 1 14 0" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </template>
      <template v-else>
        <path d="M12 20h.01" />
        <path d="M2 8.82a15 15 0 0 1 20 0" />
        <path d="M5 12.859a10 10 0 0 1 14 0" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </template>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const icons = [0, 1, 2]; // Three SVG icons
const currentIndex = ref(0);
const iconSequence = [0, 1, 2, 1]; // Animation sequence

let interval;

const switchIcon = () => {
  currentIndex.value = (currentIndex.value + 1) % iconSequence.length;
};

onMounted(() => {
  interval = setInterval(switchIcon, 700); // Change icon every second
});

onUnmounted(() => {
  clearInterval(interval); // Clear interval when component is destroyed
});
</script>

<style scoped>
.wifi-icons {
  width: 50px;
  height: 50px;
  position: relative;
}
.wifi-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease; /* Smooth transition for opacity */
}
.active {
  opacity: 1; /* Visible icon */
}
</style>
