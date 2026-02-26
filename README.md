# Lab3 - новинний портал (Vue 3)

## Автор
**Студент:** *Семенюк Богдан Павлович*  
**Група:** *ВТ-22-2
**Дисципліна:** Веб-технології

---

## Опис
Міні-сайт новин : головна зі списком статей, сторінка детальної статті, сторінка About, рекламні слоти з модалкою, Cookie-попап (GDPR), Privacy Policy, перемикач теми (dark/light), анімації переходів між сторінками.

Бекенд - Express.js API з документацією Swagger UI.

## Стек
| Шар | Технології |
|-----|-----------|
| Frontend | Vue 3 (Composition API), Vite 7, TypeScript |
| Routing | Vue Router 4 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`), PostCSS |
| Backend | Express.js, CORS |
| API Docs | swagger-jsdoc + swagger-ui-express |
| Component Docs | Storybook 8 |
| Code Docs | JSDoc 4 |
| Licensing | license-checker |

## Вимоги, що реалізовані
- Маршрути: `/`, `/article/:id`, `/about` (+ модалка через Teleport)
- REST API: `GET /api/articles`, `GET /api/articles/:id` з Swagger-анотаціями
- Список новин - завантаження через API (fallback на локальний масив)
- Картка новини: заголовок, опис, дата, зображення, кнопка переходу
- Детальна стаття: заголовок, дата, зображення, контент
- Реклама: 2 статичні AdSlot у лейауті + модалка (Teleport, кнопка закриття, анімація)
- Cookie Consent попап (GDPR): 3 категорії cookies, збереження у `localStorage`
- Privacy Policy (окремий документ)
- Перемикач теми: стан у `localStorage`, клас `dark` на `<html>`
- Анімації переходів сторінок: `<Transition name="page" mode="out-in">`

## Запуск

```bash
# 1. Встановлення залежностей
npm install

# 2. Фронтенд (дев-сервер)
npm run dev

# 3. Бекенд (Express + Swagger)
npm run dev:server        # http://localhost:3001
                          # Swagger UI: http://localhost:3001/api-docs

# 4. Storybook (компонентна документація)
npm run storybook         # http://localhost:6006

# 5. Генерація JSDoc-документації
npm run docs              # → docs/generated/

# 6. Звіт по ліцензіях
npm run license-check     # → license-report.txt

# 7. Продакшн-збірка
npm run build
npm run preview
```

## Структура проєкту (скорочено)

```
├── server/
│   ├── index.cjs           # Express API + Swagger
│   └── data/articles.cjs   # Дані статей
├── src/
│   ├── main.ts             # Вхідна точка
│   ├── App.vue             # Кореневий компонент (+ CookieConsent)
│   ├── router/             # Маршрути
│   ├── pages/              # Home / Article / About / NotFound
│   ├── components/         # Header, Footer, ArticleCard, AdSlot, AdModal, CookieConsent
│   └── data/articles.ts    # Локальні дані (fallback)
├── .storybook/             # Конфігурація Storybook
├── docs/generated/         # Згенерована JSDoc-документація
├── LICENSE                 # Ліцензія MIT
├── PRIVACY_POLICY.md       # Політика конфіденційності
└── license-report.txt      # Звіт ліцензій залежностей
```

## Ліцензія
Проєкт розповсюджується за ліцензією **MIT** - див. файл [LICENSE](LICENSE).

## Скріншоти
![Home page](/docs/screenshots/DarkThemeHome.png) - Головна зі списком

![Article](/docs/screenshots/Articl%20dark.png) - Детальна стаття

![Ad modal](/docs/screenshots/Admodal%20light.png) - Модальне вікно

**Dark / Light тема**

![Home page (Light)](/docs/screenshots/LightThemeHome.png) - Головна (світла)

![Home page (Dark)](/docs/screenshots/DarkThemeHome.png) - Головна (темна)

