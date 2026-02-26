import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal(config) {
    // Remove vite-plugin-vue-devtools and vite-plugin-inspect to avoid Storybook crash
    config.plugins = (config.plugins || []).flat().filter((plugin) => {
      const name = (plugin as any)?.name || ''
      return !name.includes('devtools') && !name.includes('inspect')
    })
    return config
  },
}

export default config