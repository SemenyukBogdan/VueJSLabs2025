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
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
  color: var(--text);
}

.article-card {
  background: var(--card-bg);
  color: var(--text);
  border-radius: 12px;
  padding: 20px;
}

.article-media { margin: 16px 0; }

.article-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 10px;
}

.article-content,
.article-text {
  color: var(--text);
}
</style>