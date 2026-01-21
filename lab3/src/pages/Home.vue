<script setup lang="ts">
import ArticleCard from '../components/ArticleCard.vue'
import {articles} from '@/data/articles.ts'

const card = {
  id: 1,
  title: 'title',
  date: '2019-02-02',
  image: 'image.png',
  content: 'content',
}

</script>

<template>
  <div class="home">
    <ArticleCard
      v-for="a in articles"
      :key="a.id"
      class="card"
      :article="a"
    />
  </div>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  width: 100%;
}

.card {
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}

</style>
