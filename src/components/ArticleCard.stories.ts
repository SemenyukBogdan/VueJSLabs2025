import type { Meta, StoryObj } from '@storybook/vue3'
import ArticleCard from './ArticleCard.vue'

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  argTypes: {
    article: {
      control: 'object',
      description: 'Article object with id, title, date, image, content',
    },
  },
}

export default meta
type Story = StoryObj<typeof ArticleCard>

/** Default article card with full data */
export const Default: Story = {
  args: {
    article: {
      id: 1,
      title: 'Zero Trust на практиці: з чого почати без оверхеду',
      date: '2025-12-15',
      image: 'https://picsum.photos/seed/sec1/900/500',
      content:
        'Zero Trust — це не про «купити один продукт», а про зміну моделі довіри: за замовчуванням не довіряємо нічому.',
    },
  },
}

/** Article card with a very long title — tests text clamping */
export const LongTitle: Story = {
  args: {
    article: {
      id: 2,
      title:
        'Дуже довгий заголовок статті для перевірки, як компонент обрізає текст при переповненні рядків у картці новини',
      date: '2025-12-14',
      image: 'https://picsum.photos/seed/sec2/900/500',
      content: 'Контент статті з довгим заголовком.',
    },
  },
}

/** Article card without an image — tests fallback rendering */
export const NoImage: Story = {
  args: {
    article: {
      id: 3,
      title: 'Стаття без зображення',
      date: '2025-12-13',
      image: '',
      content:
        'Ця стаття не має зображення, щоб перевірити поведінку компонента при відсутньому image.',
    },
  },
}