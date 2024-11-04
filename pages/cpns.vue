<template>
  <div class="flex justify-center items-center">
    <div class="max-w-5xl min-w-5xl">
      <header>
        <h1 class="text-6xl">Simulasi latihan Tes CPNS</h1>
      </header>
      <main class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <CPNSCard
          title="Tes Wawasan Kebangsaan (TWK)"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, dolor ut ultrices egestas, quam ligula euismod felis, quis tempus erat justo ut justo. Quisque a gravida tortor, quis molestie diam. Aenean in cursus nunc. Aliquam volutpat tristique elit quis mattis. Quisque ut rhoncus turpis. Aenean vel lectus nec metus venenatis tempus sed feugiat tortor."
        >
          <LucideBookOpenText />
        </CPNSCard>
        <CPNSCard
          title="Tes Intelegensi Umum (TIU)"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, dolor ut ultrices egestas, quam ligula euismod felis, quis tempus erat justo ut justo. Quisque a gravida tortor, quis molestie diam. Aenean in cursus nunc. Aliquam volutpat tristique elit quis mattis. Quisque ut rhoncus turpis. Aenean vel lectus nec metus venenatis tempus sed feugiat tortor."
        >
          <LucideBrain />
        </CPNSCard>
        <CPNSCard
          title="Tes Karakteristik Pribadi (TKP)"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, dolor ut ultrices egestas, quam ligula euismod felis, quis tempus erat justo ut justo. Quisque a gravida tortor, quis molestie diam. Aenean in cursus nunc. Aliquam volutpat tristique elit quis mattis. Quisque ut rhoncus turpis. Aenean vel lectus nec metus venenatis tempus sed feugiat tortor."
        >
          <LucideUserSearch />
        </CPNSCard>
        <CPNSCard
          title="Tes SKB CAT"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, dolor ut ultrices egestas, quam ligula euismod felis, quis tempus erat justo ut justo. Quisque a gravida tortor, quis molestie diam. Aenean in cursus nunc. Aliquam volutpat tristique elit quis mattis. Quisque ut rhoncus turpis. Aenean vel lectus nec metus venenatis tempus sed feugiat tortor."
        >
          <LucidePencilRuler />
        </CPNSCard>
      </main>
    </div>
  </div>
</template>
