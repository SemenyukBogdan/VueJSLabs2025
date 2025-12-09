<script setup lang="ts">
import { logout, isAuthed} from '@/services/AuthModule.ts'
import router from '@/router'
import { type Ref,inject } from 'vue'

const isAuth = inject("isAuthKey") as Ref<boolean>

function logoutButtonEvent() {
  logout()
  isAuth.value = false
  router.push('/login')
}



function syncAuth() {
  isAuth.value = isAuthed()
}

</script>

<template>
  <nav class="nav">
    <div class="nav-left">
      <RouterLink to="/">Home</RouterLink>
    </div>

    <div class="nav-right">
      <template v-if="isAuth">
        <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
        <div class="logout_button">
          <button @click="logoutButtonEvent">log out</button>
        </div>
      </template>
      <template v-else="isAuth">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>


    </div>
  </nav>
</template>

<style scoped>

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

</style>