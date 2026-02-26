import type { Meta, StoryObj } from '@storybook/vue3'
import AdModal from './AdModal.vue'

const meta: Meta<typeof AdModal> = {
  title: 'Components/AdModal',
  component: AdModal,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    image: {
      control: 'text',
      description: 'URL of the ad image',
    },
    text: {
      control: 'text',
      description: 'Text displayed inside the modal',
    },
  },
  args: {
    show: true,
  },
}

export default meta
type Story = StoryObj<typeof AdModal>

/** Default modal with image and text */
export const Default: Story = {
  args: {
    show: true,
    image: 'https://picsum.photos/seed/ad1/600/400',
    text: 'Спеціальна пропозиція! Знижка -30% на кібербезпекові курси.',
  },
}

/** Modal showing only text, no image */
export const TextOnly: Story = {
  args: {
    show: true,
    image: '',
    text: 'Підпишіться на нашу розсилку з новинами кібербезпеки!',
  },
}

/** Modal showing only an image, no text */
export const ImageOnly: Story = {
  args: {
    show: true,
    image: 'https://picsum.photos/seed/ad2/600/400',
    text: '',
  },
}
