<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/products" class="nav-link">{{ t('nav.products') }}</router-link>
      <router-link to="/cart" class="nav-link">{{ t('nav.cart') }}</router-link>
      <router-link to="/profile" class="nav-link">{{ t('nav.profile') }}</router-link>
      <router-link to="/settings" class="nav-link">{{ t('nav.settings') }}</router-link>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navigation {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.nav-link.router-link-active {
  background-color: #42b883;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>