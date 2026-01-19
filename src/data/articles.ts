export type Article = {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  content: string
  status?: "draft" | "published"
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Vue 3: scoped vs CSS Modules",
    excerpt: "Коротко про те, як стилізувати компоненти без конфліктів класів.",
    date: "2025-12-15",
    image: "https://picsum.photos/seed/vue1/900/500",
    content:
      "Тут повний текст новини. Можеш зробити кілька абзаців, щоб сторінка ArticleCard виглядала нормально.",
    status: "published",
  },
  {
    id: 2,
    title: "Teleport у Vue: модалки без болю",
    excerpt: "Як рендерити модальні вікна в body і не битися з z-index.",
    date: "2025-12-14",
    image: "https://picsum.photos/seed/vue2/900/500",
    content:
      "Повний текст новини про Teleport. Додай 2–3 абзаци для демонстрації верстки.",
    status: "published",
  },
  {
    id: 3,
    title: "Transition: анімація переходів між сторінками",
    excerpt: "Показуємо плавні page transitions через RouterView slot.",
    date: "2025-12-13",
    image: "https://picsum.photos/seed/vue3/900/500",
    content:
      "Повний текст новини про Transition. Додай ще тексту, щоб був скрол.",
    status: "draft",
  },
  {
    id: 4,
    title: "Transition: анімація переходів між сторінками",
    excerpt: "Показуємо плавні page transitions через RouterView slot.",
    date: "2025-12-13",
    image: "https://picsum.photos/seed/vue3/900/500",
    content:
      "Повний текст новини про Transition. Додай ще тексту, щоб був скрол.",
    status: "draft",
  },
  {
    id: 5,
    title: "Transition: анімація переходів між сторінками",
    excerpt: "Показуємо плавні page transitions через RouterView slot.",
    date: "2025-12-13",
    image: "https://picsum.photos/seed/vue3/900/500",
    content:
      "Повний текст новини про Transition. Додай ще тексту, щоб був скрол.",
    status: "draft",
  },
]
