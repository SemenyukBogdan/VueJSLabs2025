<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    type?: string
    placeholder?: string
    error?: string
    autocomplete?: string
  }>(),
  { type: "text" })

const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>()

</script>

<template>
  <label class="field">
    <span class="label">{{ label }}</span>

    <input
      class="input"
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <small v-if="error" class="error">{{ error }}</small>
  </label>
</template>

<style scoped>


</style>