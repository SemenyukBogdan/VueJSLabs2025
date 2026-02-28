<script setup lang="ts">
const route = useRoute()

const { data: post, pending, error } = useFetch(() => '/api/posts/' + route.params.slug)

useSeoMeta(() => ({
  title: post.value ? post.value.title + ' - Nuxt Course Blog' : 'Стаття - Nuxt Course Blog',
  description: post.value?.excerpt ?? 'Стаття курсу Nuxt.js.',
  ogTitle: post.value?.title,
  ogDescription: post.value?.excerpt,
}))
</script>

<template>
  <div>
    <div v-if="pending" class="flex gap-2 items-center">
      <span class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span>Завантаження...</span>
    </div>
    <UAlert v-else-if="error" title="Помилка" :description="error.message" color="error" />
    <UCard v-else-if="post">
      <template #header>
        <div class="flex justify-between items-start">
          <h1 class="text-2xl font-bold">{{ post.title }}</h1>
          <UBadge>{{ post.date }}</UBadge>
        </div>
      </template>
      <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
      <p>{{ post.body }}</p>
    </UCard>
  </div>
</template>
