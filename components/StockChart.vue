<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <apexchart
        :options="chartOptions"
        :series="series"
        type="candlestick"
        height="350"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true);
const error = ref<string | null>(null);
const series = ref([]);
const props = defineProps({
  code: {
    type: String,
    required: true,
    validator(value) {
      // Ensure the message is not empty
      if (value.trim() === "") {
        console.warn("Message prop cannot be an empty string!");
        return false;
      }
      return true;
    },
  },
});

const chartOptions = ref({
  chart: {
    type: "candlestick",
    toolbar: { show: true },
  },
  xaxis: { type: "datetime" },
  yaxis: {
    tooltip: { enabled: true },
  },
});

async function fetchStockData(symbol: string) {
  try {
    const response = await $fetch(
      `https://server-production-8e4c.up.railway.app/stock/${symbol}/1y`
    );
    if (response.error) throw new Error(response.error);

    // Set series data for the chart
    series.value = [
      {
        name: symbol,
        data: response.data,
      },
    ];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchStockData(props.code); // Replace with desired stock symbol
});
</script>

<style scoped>
.loading {
  text-align: center;
  font-size: 1.5em;
}
.error {
  color: red;
  text-align: center;
  font-size: 1.2em;
}
</style>
