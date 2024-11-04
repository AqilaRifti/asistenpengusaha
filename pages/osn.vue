<template>
    <WifiAnimation />
  <div class="flex justify-center items-center">
    <main class="max-w-5xl min-w-5xl">
      <div class="flex flex-col items-center justify-center my-6">
        <h1 class="text-5xl font-serif font-bold">SD</h1>
      </div>
      <section class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <OSNCard title="IPA" badgeContent="40 Set Soal">
          <LucideMicroscope :size="102" />
        </OSNCard>
        <OSNCard title="MATEMATIKA" badgeContent="40 Set Soal">
          <LucideDraftingCompass :size="102" />
        </OSNCard>
      </section>
      <div class="flex flex-col items-center justify-center my-6">
        <h1 class="text-5xl font-serif font-bold">SMP</h1>
      </div>
      <section class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <OSNCard title="IPA" badgeContent="40 Set Soal">
          <LucideMicroscope :size="102" />
        </OSNCard>
        <OSNCard title="IPS" badgeContent="40 Set Soal">
          <LucideHandshake :size="102" />
        </OSNCard>
        <OSNCard title="MATEMATIKA" badgeContent="40 Set Soal">
          <LucideDraftingCompass :size="102" />
        </OSNCard>
      </section>
      <div class="flex flex-col items-center justify-center my-6">
        <h1 class="text-5xl font-serif font-bold">SMA</h1>
      </div>
      <section class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <OSNCard title="ASTRONOMI" badgeContent="40 Set Soal">
          <LucideRocket :size="102" />
        </OSNCard>
        <OSNCard title="BIOLOGI" badgeContent="40 Set Soal">
          <LucideFlaskConical :size="102" />
        </OSNCard>
        <OSNCard title="EKONOMI" badgeContent="40 Set Soal">
          <LucideCircleDollarSign :size="102" />
        </OSNCard>
        <OSNCard title="FISIKA" badgeContent="40 Set Soal">
          <LucideAtom :size="102" />
        </OSNCard>
        <OSNCard title="GEOGRAFI" badgeContent="40 Set Soal">
          <LucideMapPinned :size="102" />
        </OSNCard>
        <OSNCard title="KOMPUTER" badgeContent="40 Set Soal">
          <LucideBinary :size="102" />
        </OSNCard>
        <OSNCard title="KEBUMIAN" badgeContent="40 Set Soal">
          <LucideEarth :size="102" />
        </OSNCard>
        <OSNCard title="MATEMATIKA" badgeContent="40 Set Soal">
          <LucideDraftingCompass :size="102" />
        </OSNCard>
      </section>
    </main>
  </div>
</template>
