<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue"
import AuthWrapper from '@/components/AuthWrapper.vue'
import { reactive } from "vue"
import { isAuthed, login } from '@/services/AuthModule.ts'
import router from '@/router'
import { inject, type Ref } from "vue"

const errors = reactive({
  email: "",
  password: "",
})

const form = reactive({
  email: "",
  password: "",
})

const isAuth = inject<Ref<boolean>>("isAuthKey")
if (!isAuth) throw new Error("isAuthKey was not provided")


function validateLogin() {
  errors.email = ""
  errors.password = ""

  if (!form.email.trim()) errors.email = "Input email"
  else if (!form.email.includes("@")) errors.email = "uncorrect email"

  if (!form.password.trim()) errors.password = "Input pass"
  else if (form.password.length < 6) errors.password = "min password 6 chars"

  return !errors.email && !errors.password
}



function submit() {

  if (!validateLogin()) return
  const { email, password } = form

  try{
    login(email, password)
    if(isAuth) isAuth.value = true;
    router.push("/admin/dashboard")
  }
  catch(error){
    console.log(error)
  }
}

</script>

<template>
  <AuthWrapper title="Login">
    <form class="auth-form" @submit.prevent="submit">
      <BaseInput v-model="form.email" label="Email" :error="errors.email"/>
      <BaseInput v-model="form.password" label="Password" type="password" :error="errors.password"/>
      <button>login</button>
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