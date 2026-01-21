import { defineStore } from 'pinia'
import { i18n } from '../i18n'



export const useSettingsStore = defineStore('settings', {
    state: () => ({
        locale: 'ua' as 'ua' | 'en',
    }),

    actions: {
        setLocale(lang: 'ua' | 'en') {
            this.locale = lang
            i18n.global.locale.value = lang
        },

    },

    persist: {
        pick: ['locale'],
        key: 'app-settings',
    },
})