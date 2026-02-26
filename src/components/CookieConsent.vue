<script setup lang="ts">
import { ref, onMounted } from 'vue'

/** Cookie preference categories */
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'cookie-consent'

const isVisible = ref(false)

const preferences = ref<CookiePreferences>({
  necessary: true,   // always enabled
  analytics: false,
  marketing: false,
})

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) {
    isVisible.value = true
  } else {
    preferences.value = JSON.parse(saved)
  }
})

/** Accept all cookie categories */
function acceptAll() {
  preferences.value = { necessary: true, analytics: true, marketing: true }
  save()
}

/** Reject all optional cookies (only necessary stay) */
function rejectAll() {
  preferences.value = { necessary: true, analytics: false, marketing: false }
  save()
}

/** Save current preferences to localStorage */
function savePreferences() {
  save()
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences.value))
  isVisible.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="cookie-slide">
      <div v-if="isVisible" class="cookie-banner">
        <div class="cookie-inner">
          <h3 class="cookie-title">🍪 Ми використовуємо cookies</h3>
          <p class="cookie-text">
            Цей сайт використовує cookies для забезпечення роботи, аналітики та маркетингу.
            Ви можете обрати, які категорії дозволити. Детальніше —
            <a href="/PRIVACY_POLICY.md" target="_blank" class="cookie-link">Політика конфіденційності</a>.
          </p>

          <div class="cookie-categories">
            <label class="cookie-category">
              <input type="checkbox" :checked="true" disabled />
              <span><strong>Необхідні</strong> — завжди увімкнені (сесія, тема, cookie-consent)</span>
            </label>
            <label class="cookie-category">
              <input type="checkbox" v-model="preferences.analytics" />
              <span><strong>Аналітичні</strong> — статистика відвідувань, поведінка користувачів</span>
            </label>
            <label class="cookie-category">
              <input type="checkbox" v-model="preferences.marketing" />
              <span><strong>Маркетингові</strong> — персоналізована реклама, ретаргетинг</span>
            </label>
          </div>

          <div class="cookie-actions">
            <button class="btn btn-accept" @click="acceptAll">Прийняти всі</button>
            <button class="btn btn-save" @click="savePreferences">Зберегти вибір</button>
            <button class="btn btn-reject" @click="rejectAll">Відхилити необов'язкові</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background: var(--card-bg, #fff);
  color: var(--text, #111);
  border-top: 2px solid #3b82f6;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  padding: 24px 32px;
}

.cookie-inner {
  max-width: 960px;
  margin: 0 auto;
}

.cookie-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
}

.cookie-text {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px;
  opacity: 0.85;
}

.cookie-link {
  color: #3b82f6;
  text-decoration: underline;
}

.cookie-categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.cookie-category {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.cookie-category input[type="checkbox"] {
  margin-top: 3px;
}

.cookie-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-accept {
  background: #3b82f6;
  color: white;
}
.btn-accept:hover {
  background: #2563eb;
}

.btn-save {
  background: #e5e7eb;
  color: #111;
}
.btn-save:hover {
  background: #d1d5db;
}

.btn-reject {
  background: transparent;
  color: inherit;
  border: 1px solid #9ca3af;
}
.btn-reject:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Transition */
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
