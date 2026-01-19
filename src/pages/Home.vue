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

<!--      Основний блок (контент)-->
      <ArticleCard
        v-for="a in articles"
        :key="a.id"
        class="card"
        :article="a"
      />

</template>

<style scoped>

.card {
  flex: 0 0 calc(25% - 2%);
  max-width: calc(25% - 2%);
  box-sizing: border-box;
  margin: 1%;
  overflow: hidden;

}
</style>
