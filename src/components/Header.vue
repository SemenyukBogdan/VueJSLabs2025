<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem("theme") === "dark"
})


const accent = computed(() => (isDark.value ? "#4aa3ff" : "#22c55e"))

</script>

<template>
  <header class="header" :class="{dark: isDark}">
    <div class="brand">News</div>

    <nav class="nav">
      <RouterLink to="/" class="link">Home</RouterLink>
      <RouterLink to="/about" class="link">about</RouterLink>

    </nav>
    <button class="themeBtn" @click="isDark = !isDark">
      {{ isDark ? "Dark" : "Light" }}
    </button>

  </header>



</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.header.dark {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

.brand {
  font-weight: 800;
  letter-spacing: 0.2px;
}

.nav {
  display: flex;
  gap: 12px;
  margin-left: 12px;
}

.link {
  text-decoration: none;
  opacity: 0.85;
}

.link.router-link-active {
  opacity: 1;
  font-weight: 700;
  border-bottom: 2px solid v-bind(accent);
  padding-bottom: 2px;
}

.themeBtn {
  margin-left: auto;
  padding: 8px 10px;
  border-radius: 10px;
  border: 2px solid v-bind(accent);
  background: transparent;
  color: v-bind(accent);
}
</style>