<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue"

import { reactive } from "vue"
import AuthWrapper from '@/components/AuthWrapper.vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/AuthModule.ts'
import router from '@/router'
const form = reactive({
  email: "",
  password: "",
  name: "",
  confirmPassword: ""
})


const errors = reactive({
  email: "",
  password: "",
  name: "",
  confirmPassword: ""
})

function validateRegister() {
  errors.email = ""
  errors.password = ""
  errors.name = ""
  errors.confirmPassword = ""

    if (!form.name.trim()) errors.name = "Input name"

  if (!form.email.trim()) errors.email = "Input email"
  else if (!form.email.includes("@")) errors.email = "uncorrect email"

  if (!form.password.trim()) errors.password = "Input pass"
  else if (form.password.length < 6) errors.password = "min password 6 chars"

  if (!form.confirmPassword.trim()) errors.confirmPassword = "repeat password"
  else if (form.confirmPassword !== form.password) errors.confirmPassword = "passwords don't match"

  return !errors.email && !errors.password && !errors.name && !errors.confirmPassword
}

function submit() {
  if (!validateRegister()) return

  const { email, password,name} = form

  register(email, password,name)
  router.push("/admin/dashboard")
}
</script>

<template>
  <AuthWrapper title="Login">
  <form class="auth-form">
    <BaseInput v-model="form.name" label="Name" :error="errors.name" />
    <BaseInput v-model="form.email" label="Email" :error="errors.email" />
    <BaseInput v-model="form.password" label="Password" type="password" :error="errors.password" />
    <BaseInput v-model="form.confirmPassword" label="Confirm password" type="password" :error="errors.confirmPassword" />
    <button @click.prevent="submit">Register</button>
  </form>
  </AuthWrapper>

</template>

<style scoped>
.auth-form :deep(.field){
  width: 100%;
}

.auth-form :deep(.field input){
  width: 100%;
  display: block;
}

</style>
