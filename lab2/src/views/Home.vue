<script setup lang="ts">
import { provide } from 'vue'
import { getNameOfCurrentUser, isAuthed} from '@/services/AuthModule.ts'


const welcomeMessage = isAuthed() ? 'Hello, ' + getNameOfCurrentUser() : ''

</script>

<template>
  <div class="welcome message">
    {{ welcomeMessage }}
  </div>

</template>

<style scoped>

</style>