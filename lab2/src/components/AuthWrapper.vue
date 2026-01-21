<template>
  <div class="wrap">
    <h2 class="title">{{ title }}</h2>

    <div class="card">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.wrap { width: min(420px, 100%); margin: 40px auto; }
.title { margin-bottom: 12px; }
.card { padding: 16px; border: 1px solid #444; border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(320px, 100%);
  margin: 0 auto;

}
.card :slotted(.auth-form){
  display: flex;
  flex-direction: column;
  gap: 12px;
}


</style>
