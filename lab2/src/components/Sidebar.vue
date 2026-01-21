<script setup lang="ts">

</script>

<template>
  <aside class="sidebar">
    <slot />
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  padding: 16px;
  border-right: 1px solid #444;
}
</style>
