# Lab3 — Стилізація компонентів у Vue.js

## Опис
Міні-сайт новин: головна зі списком статей, сторінка детальної статті, сторінка About, рекламні слоти з модалкою, перемикач теми, анімації переходів між сторінками.

## Стек
- Vue 3 (Composition API), Vite
- Vue Router 4
- Tailwind CSS v4 (через `@import "tailwindcss"`)
- TypeScript

## Вимоги, що реалізовані
- Маршрути: `/`, `/article/:id`, `/about` (+ модалка через Teleport)
- Список новин з локального масиву
- Картка новини: заголовок, опис, дата, зображення, кнопка переходу
- Детальна стаття: заголовок, дата, зображення, контент
- Реклама: 2 статичні AdSlot у лейауті + модалка (Teleport, кнопка закриття, анімація)
- Перемикач теми: стан у `localStorage`, клас `dark` на `<html>`
- Анімації переходів сторінок: `<Transition name="page" mode="out-in">` для `<RouterView>`, глобальні `.page-*` класи

## Запуск

```
npm install
npm run dev # локальний дев-сервер
npm run build # прод-збірка
npm run preview # перегляд прод-збірки
```


## Структура (скорочено)
- `src/main.ts` — вхід
- `src/router` — маршрути
- `src/pages` — Home / Article / About / NotFound
- `src/components` — Header, Footer, ArticleCard, AdSlot, AdModal тощо
- `src/data/articles.ts` — локальні дані

## Скріншоти
![Home page](/docs/screenshots/DarkThemeHome.png)- Головна зі списком

-Детальна стаття
![Article](/docs/screenshots/Articl%20dark.png) 

- Модальне вікно
![Ad modal](/docs/screenshots/Admodal%20light.png)

**Dark/Light тема**

- Головна зі списком
  ![Home page](/docs/screenshots/LightThemeHome.png)
-Головна зі списком (Темна)
  ![Home page](/docs/screenshots/DarkThemeHome.png)

## Особливості стилізації у Vue.js (висновок)
- `<style scoped>` ізольовує стилі компонента без конфліктів класів.
- CSS Modules дають локальні імена класів у `.module.css/.module.scss`.
- `v-bind()` у CSS дозволяє підставляти реактивні значення (наприклад, кольори теми).
- Для анімацій переходів використовуються класи `v-enter-* / v-leave-*` і `<Transition>`; для RouterView — слот із `name="page"`.
- Teleport виносить модалки в `<body>`, уникаючи проблем із `z-index` і `overflow`.
- Тема зберігається у `localStorage`, клас `dark` ставиться на `<html>`; змінні CSS керують кольорами.

