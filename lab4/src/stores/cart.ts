import { defineStore } from 'pinia'

interface CartItem {
    id: number
    title: string
    price: number
    qty: number
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
    }),

    getters: {
        totalCount(): number {
            return this.items.reduce((sum, item) => sum + item.qty, 0)
        },

        totalPrice(): number {
            return this.items.reduce((sum, item) => sum + item.price * item.qty, 0)
        },
    },

    actions: {
        add(item: { id: number; title: string; price: number }) {
            const existingItem = this.items.find(i => i.id === item.id)

            if (existingItem) {
                existingItem.qty++
            } else {
                this.items.push({
                    ...item,
                    qty: 1,
                })
            }
        },

        remove(itemId: number) {
            const index = this.items.findIndex(i => i.id === itemId)
            if (index > -1) {
                this.items.splice(index, 1)
            }
        },

        clear() {
            this.items = []
        },
    },

    persist: true,
})