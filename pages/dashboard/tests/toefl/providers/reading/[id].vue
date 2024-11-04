<script setup>
const route = useRoute()
const id = route.fullPath.split("/").at(-1)
</script>

<template>
    <h1>{{ id }}</h1>
</template>