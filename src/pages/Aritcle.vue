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

<style scoped></style>