<script setup lang="ts">
import TodoItem from './TodoItem.vue'

type Priority = 'low' | 'medium' | 'high'

defineProps<{
  list: Array<{
    id: string
    title: string
    description: string
    isComplete: boolean
    editMode: boolean
    createdAt: Date
    priority: Priority
  }>
}>()
defineEmits<{
  remove: [id: string]
  edit: [id: string]
  save: [id: string]
}>()
</script>

<template>
  <div class="todo-list" data-testid="todo-list">
    <TodoItem
      v-for="item in list"
      :key="item.id"
      :task="item"
      @remove="$emit('remove', $event)"
      @edit="$emit('edit', $event)"
      @save="$emit('save', $event)"
    />
  </div>
</template>
