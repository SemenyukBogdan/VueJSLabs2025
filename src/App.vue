<script setup lang="ts">
import  Header from '@/components/Header.vue'
import  Home from '@/pages/Home.vue'
import  Footer from '@/components/Footer.vue'
import { articles } from '@/data/articles.ts'
import ArticleCard from '@/components/ArticleCard.vue'

</script>

<template>
  <Header>
  </Header>

  <div class="layout">
    <div class="left-side-ad">
      Ліва колонка
    </div>

    <main class="main">
      <!--      Основний блок (контент)-->
      <RouterView />
    </main>

    <div class="right-side-ad">
      Права колонка
    </div>
  </div>
<Footer></Footer>
</template>

<style scoped>

.layout{
  margin-left: 1%;
  margin-right: 1%;
  display: flex;
  justify-content: space-between;
}
.main{
  flex-wrap: wrap;
  display: flex;
  width: 80%;
}
</style>
