import { createI18n } from 'vue-i18n'
import ua from './locales/ua.json'
import en from './locales/en.json'

const snakeToTitle = (value: string | unknown): string => {
    if (typeof value !== 'string') return String(value)
    return value
        .split('_')
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
}

export const i18n = createI18n({
    legacy: false,
    locale: 'ua',
    fallbackLocale: 'en',
    messages: { ua, en },
    modifiers: {
        upper: (val: string | unknown) => (typeof val === 'string' ? val.toUpperCase() : val),
        lower: (val: string | unknown) => (typeof val === 'string' ? val.toLowerCase() : val),
        capitalize: (val: string | unknown): string => {
            if (typeof val !== 'string') return String(val)
            return val.charAt(0).toUpperCase() + val.slice(1)
        },
        snakeToTitle
    }
})