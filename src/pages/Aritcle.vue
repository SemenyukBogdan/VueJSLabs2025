<script setup lang="ts">
import { useRoute } from 'vue-router'
import { articles } from '@/data/articles.ts'

const route = useRoute()
const id = route.params.id
const idNum = Number(route.params.id)

const article = articles.find((a) => a.id === idNum)
</script>

<template>
  <article class="article-card" :key="article?.id">
    <header class="article-header">
      <h1 class="article-title">{{ article?.title }}</h1>
      <p class="article-meta">{{ article?.date }}</p>
    </header>

    <div class="article-media">
      <img class="article-image" :src="article?.image" alt="" />
    </div>

    <div class="article-content">
      <p class="article-text">{{article?.content}}</p>
    </div>

    <footer class="article-actions">
      <button class="btn">Назад</button>
<!--      <button class="btn primary">Зберегти</button>-->
    </footer>
  </article>
</template>

<style scoped>
.article-page {
  max-width: 960px;   /* або 900–1100px, як зручно */
  margin: 0 auto;     /* центр по горизонталі */
  padding: 24px 16px;
}

.article-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.article-media {
  margin: 20px 0;
}

.article-image {
  max-height: 600px;
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 10px;
}
</style>