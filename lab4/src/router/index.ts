import { createRouter, createWebHistory } from 'vue-router'

import ProductsPage from '../pages/ProductsPage.vue'
import CartPage from '../pages/CartPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import SettingsPage from '../pages/SettingsPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products' },
        { path: '/products', name: 'products', component: ProductsPage },
        { path: '/cart', name: 'cart', component: CartPage },
        { path: '/profile', name: 'profile', component: ProfilePage },
        { path: '/settings', name: 'settings', component: SettingsPage },
    ],
})

// Обробка помилок навігації
router.onError((error) => {
    console.error('Router error:', error)
})

export default router
