<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt Course Blog - Головна',
  description: 'Курс з Nuxt.js: SSR, API, SEO та Nuxt UI.',
  ogTitle: 'Nuxt Course Blog',
  ogDescription: 'Курс з Nuxt.js: SSR, API, SEO та Nuxt UI.',
})
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Nuxt Course Blog</h1>
      </template>
      <p class="mb-4">
        Цей проєкт створено в рамках лабораторної роботи з Nuxt.js. Тут використовуються
        сторінки, серверні API, useFetch, SEO-налаштування та компоненти Nuxt UI.
      </p>
      <p class="text-gray-600">
        Розділи: головна, блог зі списком статей, сторінка статті за slug, сторінка "Про курс".
      </p>
    </UCard>
  </div>
</template>
