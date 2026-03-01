<script setup lang="ts">
type Priority = 'low' | 'medium' | 'high'

defineProps<{
  task: {
    id: string
    title: string
    description: string
    isComplete: boolean
    editMode: boolean
    createdAt: Date
    priority: Priority
  }
}>()
defineEmits<{
  remove: [id: string]
  edit: [id: string]
  save: [id: string]
}>()
</script>

<template>
  <div class="item-list" data-testid="todo-item" @dblclick="$emit('edit', task.id)">
    <div>
      <strong> Created at: </strong>
      {{ task.createdAt.toDateString() }} {{ task.createdAt.toLocaleTimeString() }}
    </div>
    <div>
      <strong>title:</strong>
      <template v-if="task.editMode">
        <input v-model="task.title" data-testid="todo-item-title-edit" />
      </template>
      <template v-else>
        {{ task.title }}
      </template>
    </div>
    <div>
      <strong>text:</strong>
      <template v-if="task.editMode">
        <input v-model="task.description" data-testid="todo-item-desc-edit" />
      </template>
      <template v-else>
        {{ task.description }}
      </template>
    </div>
    <div>
      <strong>priority: </strong>
      <template v-if="task.editMode">
        <select v-model="task.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </template>
      <template v-else>
        {{ task.priority }}
      </template>
    </div>
    <label>
      <input
        type="checkbox"
        v-model="task.isComplete"
        :disabled="task.editMode"
        data-testid="todo-item-checkbox"
      />
      {{ task.isComplete ? 'done' : 'Active' }}
    </label>
    <div>
      <button
        v-if="task.editMode"
        class="delete_button"
        data-testid="todo-item-save"
        @click="$emit('save', task.id)"
      >
        Save
      </button>
      <button
        v-else
        class="delete_button"
        data-testid="todo-item-delete"
        @click="$emit('remove', task.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.item-list {
  border: blueviolet 2px solid;
  padding: 10px;
  margin: 5px;
}
.delete_button {
  width: 100%;
}
</style>
