<script setup>
const layout = "home";
</script>

<template>
  <NuxtLayout :name="layout">
    <Carousel class="w-full max-w-5xl">
      <CarouselContent>
        <CarouselItem v-for="(_, index) in 5" :key="index">
          <div class="p-1">
            <Card>
              <CardContent
                class="flex  items-center justify-center p-6"
              >
                <img src="https://www.menpan.go.id/site/images/20230606_-_Menhan_Prabowo_Terima_Kunjungan_Menhan_Jerman_Bahas_Penguatan_Kerja_Sama_Pelatihan_dan_Pendidikan.jpeg" alt="">
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <FeedCard />
  </NuxtLayout>
</template>
