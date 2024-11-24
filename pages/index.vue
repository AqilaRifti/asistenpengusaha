<script setup>
useHead({
  title: `API | Beranda`,
  meta: [
    {
      name: "Halaman Utama",
      content: "Halaman utama asisten pelajar indonesia",
    },
  ],
});
</script>

<template>
  <Globe class="h-64 w-full lg:h-full sm:h-72 md:h-96" />
    <main
      class="border-gray-900 border-x-2 border-dashed"
      style="padding-left: 1rem !important; padding-right: 1rem !important"
    >
      <HomepageNavbar />
      <div class="landing-page">
        <div class="content flex flex-col gap-2">
          <h1 class="font-extrabold text-6xl text-white">
            Transformasi UMKM! <br />
            Raih Indonesia Emas 2045
          </h1>
          <p class="font-extralight text-lg text-gray-300 max-w-3xl">
            Asisten Pengusaha adalah <i>platform</i> yang menyediakan panduan
            dan layanan-layanan untuk membantu UMKM ekspor dengan menggunakan
            <i>Artificial Intelligence</i>
            yang bertujuan untuk membantu para pengusaha dalam mencari nafkah.
          </p>
          <section class="flex gap-2 justify-center items-center">
            <NuxtLink to="/register">
              <Button
                class="text-xl font-bold font-sans shadow-2xl"
                style="padding: 0.8rem !important"
                >Mulai
                <LucideCirclePlay style="padding-left: 0.2rem;"/></Button>
            </NuxtLink>
            <NuxtLink to="/register">
              <Button variant="outline" class="text-xl shadow-2xl font-bold font-sans" style="padding: 0.9rem !important">
                Jelajahi 
               <LucideTelescope style="padding-left: 0.2rem;"/>
              </Button>
            </NuxtLink>
          </section>
        </div>
      </div>
      <div
        style="max-width: 100vw !important; overflow: hidden !important"
      ></div>
    </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #0f0c29;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, #0f0c29, #302b63, #24243e);
  background-size: 300% 300%;
  animation: gradientMove 15s ease infinite;
  filter: blur(15px);
  z-index: 1;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: url("https://www.transparenttextures.com/patterns/stardust.png")
    repeat;
  opacity: 0.2;
  animation: particleMove 20s linear infinite;
}

@keyframes particleMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% -100%;
  }
}
.landing-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile {
  width: 100%;
  height: 100%;
  background-color: rgb(2, 8, 23);
  transition: background-color 0.5s;
}

.tile-active {
  background-color: rgb(14, 32, 67); /* Fire-like effect */
}

.content {
  position: relative;
  text-align: center;
  z-index: 3;
}

.badge {
  display: inline-block;
  background-color: rgb(59, 130, 236);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 16px;
}
/*
h1 {
  font-size: 48px;
  color: white;
  margin: 0;
  font-weight: 800;
}

p {
  font-size: 18px;
  margin: 16px 0;
  color: #d9f2f4;
}
*/

@media (max-width: 400px) {
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
}
</style>
