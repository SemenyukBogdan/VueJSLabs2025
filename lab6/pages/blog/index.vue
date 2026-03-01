<script setup lang="ts">
useSeoMeta({
  title: 'Блог - Nuxt Course Blog',
  description: 'Список статей курсу Nuxt.js.',
  ogTitle: 'Блог - Nuxt Course Blog',
  ogDescription: 'Список статей курсу Nuxt.js.',
})

const { data: posts, pending, error } = useFetch('/api/posts')
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Статті</h1>
    <div v-if="pending" class="flex gap-2 items-center">
      <span class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span>Завантаження...</span>
    </div>
    <UAlert v-else-if="error" title="Помилка" :description="error.message" color="error" />
    <div v-else class="grid gap-4">
      <UCard v-for="post in posts" :key="post.slug" class="cursor-pointer" @click="navigateTo('/blog/' + post.slug)">
        <template #header>
          <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold">{{ post.title }}</h2>
            <UBadge size="sm">{{ post.date }}</UBadge>
          </div>
        </template>
        <p class="text-gray-600">{{ post.excerpt }}</p>
      </UCard>
    </div>
  </div>
</template>
