<script setup lang="ts">
import { shallowRef } from 'vue'
import CompA from '@/components/CompA.vue'
import CompB from '@/components/CompB.vue'

const current = shallowRef(CompA)



</script>

<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <KeepAlive include="CompA" exclude="CompB" :max="2">
      <component :is="current"></component>
    </KeepAlive>
  </div>
</template>


<style scoped>

</style>