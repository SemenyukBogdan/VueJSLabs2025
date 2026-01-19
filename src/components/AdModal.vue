<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
  show: boolean
  image?: string
  text?: string
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const close = () => {
  emit('update:show', false)
  document.body.style.overflow = ''
}



</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal-overlay"
        @click.self="close"
      >
        <div class="modal-container">
          <button
            class="modal-close"
            @click="close"
          >
            ✕
          </button>

          <div class="modal-content">
            <img
              v-if="image"
              :src="image"
              alt="Реклама"
              class="modal-image"
            />
            <p v-if="text" class="modal-text">{{ text }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  position: relative;
  background: white;
  border-radius: 16px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  padding: 40px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

.modal-content {
  text-align: center;
}

.modal-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.modal-text {
  margin-top: 20px;
  font-size: 18px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>