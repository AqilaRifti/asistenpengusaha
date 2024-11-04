<template>
  <article class="flex flex-col text-2xl items-center my-8">
    <h1 style="color: rgb(245, 80, 54)">Powered By</h1>
    <section class="flex-1 md:flex justify-center items-center">
      <NuxtLink to="https://groq.com" target="_blank" rel="noopener noreferrer">
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="/backers/groq-dark.png"
          />
          <source
            media="(prefers-color-scheme: light)"
            srcset="/backers/groq-light.png"
          />
          <img
            alt="Groq Logo"
            width="300"
            src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/logo-preview.jpg"
          />
        </picture>
      </NuxtLink>
      <NuxtLink
        to="https://vercel.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="/backers/vercel-dark.png"
          />
          <source
            media="(prefers-color-scheme: light)"
            srcset="/backers/vercel-light.png"
          />
          <img
            alt="Vercel Logo"
            width="300"
            src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/logo-preview.jpg"
          />
        </picture>
      </NuxtLink>
      <NuxtLink
        to="https://id.wikipedia.org/wiki/Progressive_Web_App"
        target="_blank"
        rel="noopener noreferrer"
      >
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="/backers/pwa-dark.png"
          />
          <source
            media="(prefers-color-scheme: light)"
            srcset="/backers/pwa-light.png"
          />
          <img
            alt="Supabase Logo"
            width="300"
            src="/backers/supabase-dark.png"
          />
        </picture>
      </NuxtLink>
      <NuxtLink
        to="https://supabase.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="/backers/supabase-dark.png"
          />
          <source
            media="(prefers-color-scheme: light)"
            srcset="/backers/supabase-light.png"
          />
          <img
            alt="Supabase Logo"
            width="300"
            src="/backers/supabase-dark.png"
          />
        </picture>
      </NuxtLink>
    </section>
  </article>
</template>
