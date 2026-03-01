# Лабораторна робота №7 - Тестування Vue.js-додатків

Todo-застосунок на Vue 3 з unit-, component- та E2E-тестами (Vitest, Vue Test Utils, Playwright).

## Як запускати тести

### Unit / Component (Vitest)

- `npm run test:unit` - запуск unit та component тестів
- `npm run test:unit:ui` - інтерактивний UI Vitest

### Coverage

- `npm run test:unit:cov` - запуск тестів з звітом покриття
- Результат у консолі (text) та HTML-звіт у папці `coverage/` (відкрити `coverage/index.html`)

### E2E (Playwright)

- `npm run test:e2e` - запуск E2E тестів (headless)
- `npm run test:e2e:headed` - з відображенням браузера
- `npm run test:e2e:ui` - Playwright UI Mode (список тестів, прев’ю сторінки)

## Покриття (Coverage)

Після `npm run test:unit:cov`:

- Загальний відсоток покриття - у консолі (Stmts ~32 % загалом; компоненти та utils - близько 98-100 %).
- Покриті модулі: `src/utils/todoHelpers.ts` (100 %), `TodoInput.vue`, `TodoItem.vue`, `TodoList.vue` (98-100 %).
- Не покриті: `src/App.vue` (оркестрація, не тестується окремо), `src/main.ts` (виключено з coverage).

## Список реалізованих тестів

### Unit-тести

- `todoHelpers.spec.ts` - функції `getActiveCount`, `filterTodos` (патерн AAA, toEqual / toBe).

### Component-тести

- **TodoInput.vue** - монтування, props (modelValue, placeholder), v-model (setValue, перевірка emitted `update:modelValue`).
- **TodoItem.vue** - монтування, відображення props (title, description), кнопки Delete/Save залежно від editMode, події remove та save.
- **TodoList.vue** - монтування, порожній список, рендер списку з кількома задачами, передача task у TodoItem.

### E2E-сценарії (Playwright)

1. Відкриття головної сторінки Todo - перевірка видимості форми, лічильників, кнопки створення.
2. Додавання та видалення задачі - введення title/description, клік create, перевірка появи задачі, клік Delete, перевірка зникнення.
3. Фільтрація - створення двох задач, вибір фільтра «Active», фільтр по title, перевірка видимості/приховування.
4. Скріншот - збереження знімка сторінки після додавання задачі у `screenshots/todo-with-task.png`.
