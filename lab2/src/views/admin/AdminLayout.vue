<template>
  <div class="layout">
    <Sidebar>
      <nav class="menu">
        <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
        <RouterLink to="/admin/users">Users</RouterLink>
        <RouterLink to="/admin/reports">Reports</RouterLink>
      </nav>
    </Sidebar>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import UserDetails from '@/views/admin/UserDetails.vue'
</script>

<style scoped>
.layout { display: flex; }
.menu { display: flex; flex-direction: column; gap: 10px; }
.main { flex: 1; padding: 16px; }
</style>
