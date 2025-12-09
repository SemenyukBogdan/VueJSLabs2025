<template>
  <table>
    <tbody>
    <tr v-for="item in items" :key="item.id">
      <slot name="row" :item="item">

      </slot>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
type Report = { id: number | string; title: string; status: string }
defineProps<{ items: Report[] }>()
</script>
