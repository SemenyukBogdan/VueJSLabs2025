# Лабораторна робота 4: Управління станом (Pinia), локалізація (vue-i18n) та валідація форм (VeeValidate)

## Опис проекту

Міні-застосунок «Profile & Cart» з використанням Vue 3, Pinia для управління станом, vue-i18n для локалізації та VeeValidate для валідації форм.

## Кроки запуску

1. Встановіть залежності:
```bash
npm install
```

2. Запустіть dev сервер:
```bash
npm run dev
```

3. Відкрийте браузер за адресою, яку покаже Vite (зазвичай `http://localhost:5173`)

4. Збірка для продакшену:
```bash
npm run build
```

## Структура проекту

```
src/
├── stores/          # Pinia stores
│   ├── settings.ts  # Store для налаштувань (мова)
│   ├── cart.ts      # Store для кошика
│   └── products.ts  # Store для товарів
├── pages/           # Сторінки додатку
│   ├── ProductsPage.vue
│   ├── CartPage.vue
│   ├── ProfilePage.vue
│   └── SettingsPage.vue
├── locales/         # Файли локалізації
│   ├── ua.json      # Українська мова
│   └── en.json      # Англійська мова
├── i18n.ts          # Налаштування vue-i18n
├── router/          # Налаштування роутера
│   └── index.ts
└── main.ts          # Точка входу
```

## Перелік сторів та їх призначення

### 1. Settings Store (`src/stores/settings.ts`)
**Призначення:** Зберігає налаштування додатку, зокрема вибрану мову інтерфейсу.

**Поля:**
- `locale: 'ua' | 'en'` - поточна мова інтерфейсу

**Методи:**
- `setLocale(lang: 'ua' | 'en')` - змінює мову інтерфейсу та синхронізує з i18n

**Персистентність:** Використовує `pinia-plugin-persistedstate` з селективною персистентністю (`pick: ['locale']`) та власним ключем (`key: 'app-settings'`).

### 2. Cart Store (`src/stores/cart.ts`)
**Призначення:** Управління кошиком покупок.

**Поля:**
- `items: Array<CartItem>` - масив товарів у кошику
  - `id: number` - ідентифікатор товару
  - `title: string` - назва товару
  - `price: number` - ціна товару
  - `qty: number` - кількість товару

**Геттери:**
- `totalCount: number` - загальна кількість товарів у кошику
- `totalPrice: number` - загальна вартість товарів у кошику

**Методи:**
- `add(item)` - додає товар до кошика або збільшує його кількість
- `remove(itemId)` - видаляє товар з кошика
- `clear()` - очищає весь кошик

**Персистентність:** Весь стан зберігається в localStorage (`persist: true`).

### 3. Products Store (`src/stores/products.ts`)
**Призначення:** Зберігає список доступних товарів.

**Поля:**
- `items: Array<Product>` - масив товарів
  - `id: number` - ідентифікатор товару
  - `name: string` - назва товару
  - `price: number` - ціна товару
  - `description?: string` - опис товару (опціонально)

## Пояснення де застосовано ключові поняття

### Pinia

#### `createPinia`
**Де використано:** `src/main.ts` (рядок 12)
```typescript
const pinia = createPinia()
```
**Пояснення:** Створює екземпляр Pinia для управління глобальним станом додатку.

#### `defineStore`
**Де використано:** 
- `src/stores/settings.ts` (рядок 6)
- `src/stores/cart.ts` (рядок 10)
- `src/stores/products.ts` (рядок 10)

**Приклад:**
```typescript
export const useSettingsStore = defineStore('settings', {
  state: () => ({ locale: 'ua' }),
  actions: { setLocale(lang) { ... } }
})
```
**Пояснення:** Використовується для створення store з станом, геттерами та діями.

#### `storeToRefs`
**Де використано:** `src/pages/CartPage.vue` (рядок 30)
```typescript
const { items, totalCount, totalPrice } = storeToRefs(cartStore)
```
**Пояснення:** Використовується для отримання реактивних посилань на стан store. Необхідний для збереження реактивності при деструктуризації.

### pinia-plugin-persistedstate

#### `pick`
**Де використано:** `src/stores/settings.ts` (рядок 20)
```typescript
persist: {
  pick: ['locale'],
  key: 'app-settings'
}
```
**Пояснення:** Вказує які поля зберігати в localStorage. У нашому випадку зберігається тільки `locale`.

#### `key` (custom key)
**Де використано:** `src/stores/settings.ts` (рядок 21)
```typescript
persist: {
  pick: ['locale'],
  key: 'app-settings'
}
```
**Пояснення:** Вказує власний ключ для збереження в localStorage замість дефолтного (який був би `settings`).

### vue-i18n

#### `createI18n`
**Де використано:** `src/i18n.ts` (рядок 14)
```typescript
export const i18n = createI18n({
  legacy: false,
  locale: 'ua',
  fallbackLocale: 'en',
  messages: { ua, en },
  modifiers: { ... }
})
```
**Пояснення:** Створює екземпляр i18n з налаштуваннями локалізації, повідомленнями та модифікаторами.

#### `t()` (функція перекладу)
**Де використано:** 
- `src/App.vue` - для навігації
- `src/pages/SettingsPage.vue` - для міток форми
- `src/pages/ProductsPage.vue` - для назв та кнопок
- `src/pages/CartPage.vue` - для всіх текстів
- `src/pages/ProfilePage.vue` - для міток форми та помилок

**Приклад:**
```typescript
const { t } = useI18n()
// У template:
{{ t('nav.products') }}
```
**Пояснення:** Функція для отримання перекладених рядків за ключем. Автоматично використовує поточну мову з i18n.

#### Кастомний модифікатор `snakeToTitle`
**Де використано:** `src/i18n.ts` (рядки 5-12, 26)
```typescript
const snakeToTitle = (value: string | unknown): string => {
  if (typeof value !== 'string') return String(value)
  return value
    .split('_')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}
```
**Пояснення:** Кастомний модифікатор який перетворює рядки з підкресленнями (наприклад, `my_profile_settings`) у читабельний формат (`My Profile Settings`).

**Синхронізація з settings.locale:**
**Де використано:** `src/main.ts` (рядки 40-41)
```typescript
const settingsStore = useSettingsStore()
i18n.global.locale.value = settingsStore.locale
```
**Пояснення:** При старті додатку встановлюється мова i18n зі збереженого значення в Pinia store.

### VeeValidate

#### `configure()`
**Де використано:** `src/main.ts` (рядки 12-29)
```typescript
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  generateMessage: (context) => { ... }
})
```
**Пояснення:** Глобальне налаштування VeeValidate. Встановлює коли валідувати поля та як генерувати повідомлення про помилки з інтеграцією i18n.

#### `useForm`
**Де використано:** `src/pages/ProfilePage.vue` (рядок 50)
```typescript
const { handleSubmit: onSubmit, resetForm, setFieldError } = useForm({
  validationSchema,
  initialValues: { ... }
})
```
**Пояснення:** Створює форму з валідацією. Повертає методи для обробки відправки, скидання форми та встановлення помилок.

#### `useField`
**Де використано:** `src/pages/ProfilePage.vue` (рядки 60-120)
```typescript
const { value, handleChange, handleBlur, meta, errors } = useField('name')
```
**Пояснення:** Створює окреме поле форми з валідацією. Використовується для полів: name, email, dateOfBirth, address.

#### `useFieldArray`
**Де використано:** `src/pages/ProfilePage.vue` (рядок 125)
```typescript
const { fields, push, remove, meta } = useFieldArray('phones')
```
**Пояснення:** Створює динамічний масив полів. Використовується для масиву телефонів, дозволяє додавати та видаляти поля динамічно.

#### `validationSchema` (Yup)
**Де використано:** `src/pages/ProfilePage.vue` (рядки 35-48)
```typescript
const validationSchema = yup.object({
  name: yup.string().required('required').min(2, 'min'),
  email: yup.string().required('required').email('email'),
  dateOfBirth: yup.date().required('required').max(new Date(), 'date'),
  address: yup.string(),
  phones: yup.array().of(yup.string().matches(/^\+?[0-9]{10,15}$/, 'phone')).min(1, 'required')
})
```
**Пояснення:** Схема валідації створена з Yup. Визначає правила валідації для кожного поля форми. Ключі помилок (наприклад, 'required', 'email') використовуються для локалізації через i18n.

#### `setFieldError`
**Де використано:** `src/pages/ProfilePage.vue` (рядок 155)
```typescript
const emulateServerError = () => {
  setFieldError('email', t('errors.serverError'))
}
```
**Пояснення:** Використовується для емуляції помилки від сервера. Встановлює помилку для конкретного поля програмно.

## Скріншоти

1. **ProfilePage українською** - форма профілю з усіма полями
![profile ua](/docs/screenshotes/profile.png)
2. **ProfilePage англійською** - та сама форма після зміни мови
![profile eng](/docs/screenshotes/profile%20eng.png)
3. **Помилки валідації** - форма з помилками валідації (порожні поля, неправильний email тощо)
![validation errors](/docs/screenshotes/Profile%20errors.png)
4. **CartPage** - сторінка кошика з товарами та загальною сумою
![cart](/docs/screenshotes/cart.png)

## Технології

- Vue 3 (Composition API)
- Pinia 3
- vue-i18n 9
- VeeValidate 4
- Yup 1
- Vue Router 4
- TypeScript
- Vite

## Cеменюк Богдан ВТ-22-2

Лабораторна робота 4 - Управління станом, локалізація та валідація форм
