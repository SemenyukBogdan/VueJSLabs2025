<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { articles } from "@/data/articles.ts"

type Article = {
  id: number | string
  title: string
  date: string
  image: string
  content: string
}

defineProps<{ article: Article }>()

</script>

<template>

  <article class="card" :key="article.id">
    <h4 class="title">{{ article.title }}</h4>
    <p class="date">{{ article.date }}</p>

    <img class="image" :src="article.image" :alt="article.title" />

    <p class="content">{{ article.content }}</p>
    <RouterLink :to="`/article/${article.id}`" class="button-container">
      <button>читати</button>
    </RouterLink>

  </article>

</template>
<style scoped>
.card { padding: 16px; border-radius: 14px; border: 1px solid rgba(0,0,0,.12); }
.title { margin: 0 0 6px; font-weight: 800;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

}
.date {
  margin: 0 0 12px; opacity: .75;


}
.image { width: 100%; max-width: 100%; border-radius: 12px; display: block;
  object-fit: cover;
  height: 110px;
}
.content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.button-container {
  display: flex;
  justify-content: end;
}
</style>
