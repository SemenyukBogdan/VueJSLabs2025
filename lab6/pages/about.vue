<script setup lang="ts">
useSeoMeta({
  title: 'Про курс - Nuxt Course Blog',
  description: 'Інформація про курс Nuxt.js та автора.',
  ogTitle: 'Про курс - Nuxt Course Blog',
  ogDescription: 'Інформація про курс Nuxt.js та автора.',
})
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Про курс</h1>
      </template>
      <p class="mb-4">
        Курс присвячено Nuxt.js: структура проєкту, режими рендерингу (SSR, SSG),
        серверні роути Nitro, useFetch, SEO (useSeoMeta, sitemap, robots) та Nuxt UI.
      </p>
      <p class="text-gray-600">
        Лабораторна робота №6. Nuxt.js 4 та Nuxt UI.
      </p>
    </UCard>
  </div>
</template>
