import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from './i18n'
import { useSettingsStore } from './stores/settings'
import { configure } from 'vee-validate'

// Налаштування VeeValidate з інтеграцією i18n
configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,

    // Функція для локалізації повідомлень про помилки
    generateMessage: (context: any) => {
        const ruleName = context.rule?.name || 'default'
        const messageKey = `errors.${ruleName}`
        const params = context.rule?.params || {}

        return i18n.global.t(messageKey, {
            field: context.field?.label || context.field?.name || '',
            min: params.min,
            max: params.max,
            ...params
        }) || `${context.field?.label || context.field?.name || 'Field'} is invalid`
    }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)

const settingsStore = useSettingsStore()
i18n.global.locale.value = settingsStore.locale

app.mount('#app')