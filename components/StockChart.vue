<template>
  <div>
    <h1>Overlapping Stock Charts</h1>
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

<script setup>
const config = useRuntimeConfig();
const loading = ref(true);
const error = ref(null);
const chartOptions = ref({});
const series = ref([]);

async function fetchStockData(symbol) {
  try {
    const API_KEY = config.public.twelveDataAPIKey; // Replace with your API key
    const BASE_URL = "https://api.twelvedata.com/time_series";
    const response = await $fetch(BASE_URL, {
      method: "GET",
      params: {
        symbol,
        interval: "1day",
        outputsize: 60,
        format: "json",
        apikey: API_KEY,
      },
    });

    const { values } = response;
    const formattedData = values
      .map((entry) => ({
        x: new Date(entry.datetime).getTime(),
        y: [
          parseFloat(entry.open),
          parseFloat(entry.high),
          parseFloat(entry.low),
          parseFloat(entry.close),
        ],
      }))
      .reverse(); // Reverse the array to match chronological order

    return {
      symbol,
      data: formattedData,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch data for ${symbol}`);
  }
}

onMounted(async () => {
  try {
    const symbols = ["AAPL", "MSFT"]; // Replace with desired stock symbols
    const stockData = await Promise.all(symbols.map(fetchStockData));

    // Prepare series data for both stocks
    series.value = stockData.map((stock) => ({
      name: stock.symbol,
      data: stock.data,
    }));

    // Chart options for the overlapping candlestick chart
    chartOptions.value = {
      chart: {
        type: "candlestick",
      },
      title: {
        text: "Overlapping Stock Prices (AAPL vs MSFT)",
        align: "center",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      tooltip: {
        shared: false,
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
          const date = new Date(w.globals.labels[dataPointIndex]);

          return `
            <div style="padding: 10px; background: #333; color: #fff; border-radius: 5px;">
              <strong>${date.toLocaleDateString()}</strong><br />
              Open: ${o}<br />
              High: ${h}<br />
              Low: ${l}<br />
              Close: ${c}
            </div>
          `;
        },
      },
    };
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style>
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
