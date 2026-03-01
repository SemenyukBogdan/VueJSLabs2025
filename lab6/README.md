# Лабораторна робота №6 — Nuxt Course Blog

Тема: Nuxt.js 4 та Nuxt UI.

## Запуск проєкту

```bash
npm install
npm run dev
```

Відкрити в браузері: http://localhost:3000

Збірка для продакшену:

```bash
npm run build
npm run preview
```

## Скріншоти

Потрібно додати скріншоти сторінок: `/`, `/blog`, `/blog/[slug]` (наприклад `/blog/nuxt-ssr`), `/about`.

## Опис реалізації

### useFetch

- **Сторінка /blog** (`pages/blog/index.vue`): виклик `useFetch('/api/posts')` для отримання списку статей. Використовуються повернуті `data`, `pending`, `error`: під час завантаження показується текст з індикатором, при помилці — `UAlert`, інакше — картки статей.
- **Сторінка /blog/[slug]** (`pages/blog/[slug].vue`): виклик `useFetch(() => '/api/posts/' + route.params.slug)` для отримання однієї статті за slug. Аналогічно обробляються `pending` та `error`.

### API (server/api)

- `server/api/posts.get.ts` — обробник GET, повертає масив статей (defineEventHandler).
- `server/api/posts/[slug].get.ts` — обробник GET за динамічним slug; через `event.context.params` отримується slug, повертається одна стаття або помилка 404 (createError).

### SEO

- На всіх сторінках використано **useSeoMeta**: title, description, ogTitle, ogDescription.
- Файли: `pages/index.vue`, `pages/blog/index.vue`, `pages/blog/[slug].vue`, `pages/about.vue`.
- У DevTools (Elements) у `<head>` будуть теги `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">` та відповідний `<title>`.

### sitemap.xml та robots.txt

- **sitemap**: модуль `@nuxtjs/sitemap`. У `nuxt.config.ts` задано `site.url` та `sitemap.sources: ['/api/__sitemap__/urls']`. Джерело `server/api/__sitemap__/urls.ts` повертає URL статей блогу (`/blog/nuxt-ssr`, `/blog/nitro-api`, `/blog/usefetch`). Статичні маршрути (/, /blog, /about) додаються модулем з pages. Перевірка: http://localhost:3000/sitemap.xml
- **robots**: модуль `@nuxtjs/robots`. У конфігу задано `allow: ['/', '/blog', '/about']`, `disallow: ['/admin', '/api/']` — індексація основних сторінок дозволена, службові шляхи (/admin, /api/*) заборонені. Перевірка: http://localhost:3000/robots.txt

### Компоненти Nuxt UI

- **layouts/default.vue**: `UContainer` (обгортка контенту хедера, основного блоку та футера).
- **pages/index.vue**: `UCard` (блок з описом курсу).
- **pages/about.vue**: `UCard` (блок "Про курс").
- **pages/blog/index.vue**: `UCard` (картка кожної статті), `UBadge` (дата), `UAlert` (помилка), індикатор завантаження під час pending.
- **pages/blog/[slug].vue**: `UCard` (стаття), `UBadge` (дата), `UAlert` (помилка), індикатор завантаження при pending.

## Структура директорій

- `app.vue` — корінь, `<NuxtLayout>` та `<NuxtPage />`
- `layouts/default.vue` — хедер, меню, футер
- `pages/` — index, blog, blog/[slug], about
- `server/api/` — API: posts.get.ts, posts/[slug].get.ts, __sitemap__/urls.ts
- `nuxt.config.ts` — модулі (Nuxt UI, sitemap, robots), site.url, sitemap.sources, robots.allow/disallow
