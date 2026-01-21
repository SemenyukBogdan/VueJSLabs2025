<template>
  <div class="page">
    <h1>{{ t('nav.settings') }}</h1>
    
    <div class="settings-section">
      <label class="settings-label">{{ t('common.language') }}:</label>
      <select 
        v-model="selectedLocale" 
        @change="changeLanguage"
        class="language-select"
      >
        <option value="ua">Українська</option>
        <option value="en">English</option>
      </select>
    </div>

    <div class="info-section">
      <p>{{ t('settings.currentLanguage') }}: <strong>{{ selectedLocale === 'ua' ? 'Українська' : 'English' }}</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()
const settingsStore = useSettingsStore()

// Поточна мова з Pinia store
const selectedLocale = computed({
  get: () => settingsStore.locale,
  set: (value: 'ua' | 'en') => {
    settingsStore.setLocale(value)
  }
})

const changeLanguage = () => {
  // Мова вже змінилася через v-model, але можна викликати явно
  settingsStore.setLocale(selectedLocale.value)
}
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 600px;
}

.settings-section {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.settings-label {
  font-weight: 600;
  font-size: 1.1rem;
}

.language-select {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.language-select:hover {
  border-color: #42b883;
}

.language-select:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.info-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 6px;
}

.info-section p {
  margin: 0;
  color: #666;
}

.info-section strong {
  color: #42b883;
}
</style>
