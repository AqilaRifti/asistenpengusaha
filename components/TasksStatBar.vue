<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { name: 'Monday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
  { name: 'Tuesday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
  { name: 'Wednesday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
  { name: 'Thursday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
  { name: 'Friday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
  { name: 'Saturday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
  { name: 'Sunday', "Target Tasks": Math.floor(Math.random() * 2000) + 500, "Finished Tasks": Math.floor(Math.random() * 2000) + 500 },
]
</script>

<template>
  <BarChart
    :data="data"
    index="name"
    :categories="['Target Tasks', 'Finished Tasks']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
        : ''
    }"
    :rounded-corners="4"
    :colors="['#42424a', '#22c35d']"
  />
</template>