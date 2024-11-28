<script setup lang="ts">
const route = useRoute();
const code = route.fullPath.split("/").at(-1);
</script>

<template>
    <StockChart :code="`${code}`" />
</template>