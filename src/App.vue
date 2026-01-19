<script setup lang="ts">
import  Header from '@/components/Header.vue'
import  Home from '@/pages/Home.vue'
import  Footer from '@/components/Footer.vue'
import { articles } from '@/data/articles.ts'
import ArticleCard from '@/components/ArticleCard.vue'
import AdSlot from '@/components/AdSlot.vue'
import {ref} from 'vue'
import AdModal from '@/components/AdModal.vue'



//ЗАВТРА: 1. Анімація Transition для RouterView. 2. LocalStorage для теми.

const isAdModalOpen = ref(false)

// ✅ Функція для відкриття модалки
const openAdModal = () => {
  isAdModalOpen.value = true
}


</script>

<template>
  <Header>
  </Header>

  <div class="layout pl-2 pr-2">
    <div class="left-side-ad">

      <AdSlot @click="openAdModal" class="right-2.5"><img  src="https://ih1.redbubble.net/image.397616668.1231/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt=""></AdSlot>
    </div>

    <main class="main pl-2 pr-2">
      <RouterView />
    </main>

    <div class="right-side-ad">
      <AdSlot @click="openAdModal" class="left-2.5"><img src="https://www.clipartmax.com/png/middle/133-1335198_ads-your-ad-here-png.png" alt=""></AdSlot>

    </div>

    <AdModal
      v-model:show="isAdModalOpen"
      image="https://aaft.com/blog/wp-content/uploads/2025/05/What-is-Advertising-1-1024x643.jpg"
      text="Hello. It is modal"
    />
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
  background-color: #f9f9f9;
  flex-wrap: wrap;
  display: flex;
  width: 80%;
}
</style>
