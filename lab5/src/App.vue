<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const inst = getCurrentInstance()
const $copyToClipboard = inst?.appContext?.config?.globalProperties?.$copyToClipboard ?? (async () => false)

// --- Форма контактна ---
const formName = ref('')
const formEmail = ref('')
const formPhone = ref('')
const formMessage = ref('')
const formPrivacy = ref(false)
const nameInvalid = ref(false)
const emailInvalid = ref(false)
const phoneInvalid = ref(false)
const messageInvalid = ref(false)
const privacyInvalid = ref(false)

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function submitForm() {
  let hasError = false
  nameInvalid.value = !formName.value.trim()
  emailInvalid.value = !formEmail.value.trim() || !validateEmail(formEmail.value)
  phoneInvalid.value = !formPhone.value || formPhone.value.includes('_')
  messageInvalid.value = !formMessage.value.trim()
  privacyInvalid.value = !formPrivacy.value
  if (nameInvalid.value || emailInvalid.value || phoneInvalid.value || messageInvalid.value || privacyInvalid.value) hasError = true
  if (hasError) return
  formName.value = ''
  formEmail.value = ''
  formPhone.value = ''
  formMessage.value = ''
  formPrivacy.value = false
  nameInvalid.value = false
  emailInvalid.value = false
  phoneInvalid.value = false
  messageInvalid.value = false
  privacyInvalid.value = false
  toast.add({ severity: 'success', summary: 'Успішно', detail: 'Заявку надіслано', life: 4000 })
}

// --- Калькулятор тарифів ---
const calcUsers = ref(5)
const basePricePerUser = 49
const totalPrice = computed(() => (calcUsers.value || 0) * basePricePerUser)

// --- Обраний план (перемикання, не лише копіювання) ---
const selectedPlan = ref(null)
const planNames = { basic: 'Basic', team: 'Team', pro: 'Pro' }

async function selectPlan(planId, copyText) {
  selectedPlan.value = planId
  const name = planNames[planId] || planId
  toast.add({ severity: 'info', summary: 'План обрано', detail: `Обрано план ${name}. Заповніть форму нижче.`, life: 4000 })
  await copyAndToast(copyText)
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

// --- CopyToClipboard (плагін) ---
async function copyAndToast(getText) {
  const text = typeof getText === 'function' ? getText() : getText
  const ok = await $copyToClipboard(text)
  if (ok) toast.add({ severity: 'success', summary: 'Скопійовано', detail: 'Скопійовано в буфер обміну', life: 3000 })
}
</script>

<template>
  <div class="landing">
    <Toast />

    <!-- 2.1 Header -->
    <header class="header">
      <div class="header-inner">
        <span class="logo" @click="copyAndToast('TaskFlow')">TaskFlow</span>
        <nav>
          <a href="#hero">Головна</a>
          <a href="#problem">Проблема</a>
          <a href="#benefits">Переваги</a>
          <a href="#how">Як це працює</a>
          <a href="#pricing">Тарифи</a>
          <a href="#reviews">Відгуки</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Контакти</a>
        </nav>
      </div>
    </header>

    <!-- 2.2 Hero -->
    <section id="hero" class="hero">
      <div class="hero-inner">
        <h1>Менеджер задач для команди</h1>
        <p class="hero-desc">Плануйте справи, розподіляйте завдання та контролюйте дедлайни в одному місці.</p>
        <Button label="Спробувати безкоштовно" severity="primary" size="large" @click="copyAndToast('https://taskflow.demo/start')" />
      </div>
    </section>

    <!-- 2.3 Проблема - Рішення -->
    <section id="problem" class="section problem-solution">
      <div class="container">
        <h2 class="section-title">Проблема — Рішення</h2>
        <div class="two-cols">
          <Panel header="Проблема" class="panel-half">
            <p>Розрізнені чати, таблиці та листи — важко відстежити, хто що робить і до кого термін.</p>
          </Panel>
          <Panel header="Рішення" class="panel-half">
            <p>TaskFlow об’єднує завдання, дедлайни та команду в одному інструменті з прозорою звітністю.</p>
          </Panel>
        </div>
      </div>
    </section>

    <!-- 2.4 Переваги -->
    <section id="benefits" class="section benefits">
      <div class="container">
        <h2 class="section-title">Переваги</h2>
        <div class="benefits-grid">
          <Card class="benefit-card">
            <template #title>Дошки та списки</template>
            <template #content>
              <p>Канбан і списки завдань під різні стилі роботи.</p>
            </template>
          </Card>
          <Card class="benefit-card">
            <template #title>Спільний доступ</template>
            <template #content>
              <p>Ролі та права доступу для команди та клієнтів.</p>
            </template>
          </Card>
          <Card class="benefit-card">
            <template #title>Звіти</template>
            <template #content>
              <p>Прогрес по проєктах та завантаженість без ручного збору.</p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- 2.5 Як це працює -->
    <section id="how" class="section how">
      <div class="container">
        <h2 class="section-title">Як це працює</h2>
        <ol class="steps-list">
          <li>Зареєструйтесь та створіть проєкт.</li>
          <li>Додайте завдання та призначте виконавців.</li>
          <li>Відстежуйте статуси та дедлайни на дошці.</li>
          <li>Переглядайте звіти та плануйте наступні спринти.</li>
        </ol>
      </div>
    </section>

    <!-- 2.6 Тарифи -->
    <section id="pricing" class="section pricing">
      <div class="container">
        <h2 class="section-title">Тарифи / Плани</h2>
        <div class="pricing-cards">
          <Card :class="['price-card', { selected: selectedPlan === 'basic' }]">
            <template #title>Basic</template>
            <template #subtitle>Для особистої продуктивності</template>
            <template #content>
              <p class="price">99 грн/міс</p>
              <ul>
                <li>До 3 проєктів</li>
                <li>Необмежені завдання</li>
                <li>Історія 30 днів</li>
                <li>Експорт у PDF</li>
              </ul>
              <Button label="Обрати план" severity="secondary" class="mt" @click="selectPlan('basic', 'План Basic — 99 грн/міс')" />
            </template>
          </Card>
          <Card :class="['price-card', 'featured', { selected: selectedPlan === 'team' }]">
            <template #title>Team</template>
            <template #subtitle>Для невеликих команд</template>
            <template #content>
              <p class="price">від 49 грн/міс за користувача</p>
              <ul>
                <li>До 10 проєктів</li>
                <li>До 10 учасників</li>
                <li>Спільні дошки та звіти</li>
                <li>Підтримка по email</li>
              </ul>
              <Button label="Обрати план" class="mt" @click="selectPlan('team', 'План Team — від 49 грн/міс за користувача')" />
            </template>
          </Card>
          <Card :class="['price-card', { selected: selectedPlan === 'pro' }]">
            <template #title>Pro</template>
            <template #subtitle>Для компаній та агентств</template>
            <template #content>
              <p class="price">від 79 грн/міс за користувача</p>
              <ul>
                <li>Необмежені проєкти</li>
                <li>Необмежені учасники</li>
                <li>API та інтеграції</li>
                <li>Пріоритетна підтримка</li>
              </ul>
              <Button label="Обрати план" severity="secondary" class="mt" @click="selectPlan('pro', 'План Pro — від 79 грн/міс за користувача')" />
            </template>
          </Card>
        </div>
        <Panel header="Орієнтовна вартість (план Team)" class="calc-panel">
          <div class="calc-row">
            <label>Кількість користувачів:</label>
            <InputNumber v-model="calcUsers" :min="1" :max="100" showButtons />
          </div>
          <p class="calc-result">Орієнтовна вартість: {{ totalPrice }} грн/міс.</p>
        </Panel>
      </div>
    </section>

    <!-- 2.7 Відгуки -->
    <section id="reviews" class="section reviews">
      <div class="container">
        <h2 class="section-title">Відгуки</h2>
        <div class="reviews-grid">
          <Card>
            <template #content>
              <p class="review-text">«Нарешті вся команда в одному місці. Дедлайни більше не губились.»</p>
              <p class="review-author">— Олена К., менеджер проєктів</p>
            </template>
          </Card>
          <Card>
            <template #content>
              <p class="review-text">«Простий інтерфейс, швидкий старт. Рекомендую для малого бізнесу.»</p>
              <p class="review-author">— Андрій М., засновник стартапу</p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- 2.8 FAQ -->
    <section id="faq" class="section faq">
      <div class="container">
        <h2 class="section-title">FAQ</h2>
        <Panel header="Чи є безкоштовний період?" toggleable>
          Так, 14 днів пробного періоду для планів Team та Pro без прив’язки картки.
        </Panel>
        <Panel header="Чи можна змінити план пізніше?" toggleable>
          Так, ви можете в будь-який момент перейти на вищий або нижчий тариф; зміни застосовуються з наступного циклу.
        </Panel>
        <Panel header="Де зберігаються дані?" toggleable>
          Сервери розташовані в ЄС; ми дотримуємось GDPR та надаємо угоду обробки даних.
        </Panel>
      </div>
    </section>

    <!-- 2.9 Контактна форма -->
    <section id="contact" class="section contact">
      <div class="container">
        <h2 class="section-title">Напишіть нам</h2>
        <Card class="form-card">
          <template #content>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="field">
                <label for="name">Ім'я</label>
                <InputText id="name" v-model="formName" placeholder="Ваше ім'я" :invalid="nameInvalid" class="full" />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <InputText id="email" v-model="formEmail" type="email" placeholder="email@example.com" :invalid="emailInvalid" class="full" />
              </div>
              <div class="field">
                <label for="phone">Телефон</label>
                <InputMask id="phone" v-model="formPhone" mask="+38 (099) 999-99-99" placeholder="+38 (099) 999-99-99" :invalid="phoneInvalid" class="full" />
              </div>
              <div class="field">
                <label for="msg">Повідомлення</label>
                <Textarea id="msg" v-model="formMessage" placeholder="Ваше повідомлення..." rows="4" :invalid="messageInvalid" class="full" />
              </div>
              <div class="field checkbox-field">
                <Checkbox v-model="formPrivacy" inputId="privacy" :binary="true" :invalid="privacyInvalid" />
                <label for="privacy">Погоджуюсь з політикою конфіденційності</label>
              </div>
              <Button type="submit" label="Надіслати" />
            </form>
          </template>
        </Card>
      </div>
    </section>

    <!-- 2.10 Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <p>© 2025 TaskFlow. Лабораторна робота №5, Vue.js + PrimeVue.</p>
        <p class="footer-email" @click="copyAndToast('support@taskflow.demo')">support@taskflow.demo</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Палітра: фон #f8fafc, текст #0f172a/#475569, акцент teal */
.landing {
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
}

/* Шапка — мінімалістична, з тінню та чітким текстом */
.header {
  background: #ffffff;
  padding: 0.875rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  border-bottom: 1px solid #e2e8f0;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.logo {
  font-weight: 700;
  font-size: 1.35rem;
  cursor: pointer;
  color: #0d9488;
  letter-spacing: -0.02em;
}
nav {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}
nav a {
  color: #475569;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color 0.15s ease;
}
nav a:hover {
  color: #0d9488;
}

/* Hero */
.hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%);
}
.hero-inner { max-width: 700px; margin: 0 auto; }
.hero h1 {
  font-size: 2.25rem;
  margin-bottom: 1rem;
  color: #0f172a;
  font-weight: 700;
  line-height: 1.25;
}
.hero-desc {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: #475569;
  line-height: 1.6;
}

/* Секції */
.section { padding: 3rem 2rem; }
.container { max-width: 1100px; margin: 0 auto; }
.section-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
}

.two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 600px) { .two-cols { grid-template-columns: 1fr; } }
.panel-half { flex: 1; }

/* Картки переваг — білий фон, чіткий текст */
.benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
.benefit-card { height: 100%; }
.benefit-card :deep(.p-card-title),
.benefit-card :deep(.p-card-content) { color: #0f172a; }
.benefit-card :deep(.p-card-content p) { color: #475569; }

.steps-list { max-width: 500px; margin: 0 auto; line-height: 1.8; color: #334155; }
.steps-list li { margin-bottom: 0.5rem; }

.pricing-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.price-card { height: 100%; display: flex; flex-direction: column; }
.price-card.featured { border: 2px solid #0d9488; }
.price-card.selected { box-shadow: 0 0 0 3px #0d9488; }
.price-card :deep(.p-card-title),
.price-card :deep(.p-card-subtitle),
.price-card :deep(.p-card-content) { color: #0f172a; }
.price-card :deep(.p-card-content p),
.price-card :deep(.p-card-content li) { color: #475569; }
.price { font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0 1rem; color: #0f172a; }
.price-card ul { margin: 0.5rem 0 1rem; padding-left: 1.25rem; }
.mt { margin-top: 0.5rem; }

.calc-panel { max-width: 400px; margin: 0 auto; }
.calc-panel :deep(.p-panel-title),
.calc-panel :deep(.p-panel-content) { color: #0f172a; }
.calc-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.calc-row label { min-width: 180px; color: #334155; font-weight: 500; }
.calc-result { font-weight: 600; margin-top: 0.5rem; color: #0f172a; }

.reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.reviews-grid :deep(.p-card-content) { color: #0f172a; }
.review-text { font-style: italic; margin-bottom: 0.5rem; color: #334155; }
.review-author { font-size: 0.9rem; color: #64748b; }

.faq .container { max-width: 600px; }
.faq :deep(.p-panel-title),
.faq :deep(.p-panel-content) { color: #0f172a; }
.faq :deep(.p-panel-content) { color: #475569; line-height: 1.6; }

.form-card { max-width: 500px; margin: 0 auto; }
.form-card :deep(.p-card-content) { color: #0f172a; }
.contact-form .field { margin-bottom: 1rem; }
.contact-form label { display: block; margin-bottom: 0.35rem; font-weight: 600; color: #334155; }
.full { width: 100%; }
.checkbox-field { display: flex; align-items: center; gap: 0.5rem; }
.checkbox-field label { margin-bottom: 0; color: #475569; }

.footer {
  background: #0f172a;
  padding: 1.75rem 2rem;
  text-align: center;
  color: #e2e8f0;
}
.footer-inner { max-width: 1100px; margin: 0 auto; }
.footer p { color: #cbd5e1; margin: 0; }
.footer-email {
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
  color: #67e8f9;
  font-weight: 500;
}
.footer-email:hover { color: #a5f3fc; }

/* Панелі проблема/рішення — читабельний текст */
.problem-solution :deep(.p-panel-title),
.problem-solution :deep(.p-panel-content) { color: #0f172a; }
.problem-solution :deep(.p-panel-content p) { color: #475569; line-height: 1.6; }
</style>
