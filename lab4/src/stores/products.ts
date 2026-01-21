import { defineStore } from 'pinia'

interface Product {
    id: number
    name: string
    price: number
    description?: string
}

export const useProductsStore = defineStore('products', {
    state: () => ({
        items: [
            { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
            { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
            { id: 3, name: 'Product 3', price: 300, description: 'Description 3' },
        ] as Product[],
    }),
})