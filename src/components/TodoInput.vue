<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    data-testid="todo-input"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
