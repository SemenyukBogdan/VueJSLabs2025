<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref,provide,onMounted} from 'vue'
import { isAuthed} from '@/services/AuthModule.ts'

const isAuth = ref(isAuthed())
provide("isAuthKey", isAuth)

</script>

<template>


  <Header></Header>
  <RouterView />


</template>

<style scoped></style>
