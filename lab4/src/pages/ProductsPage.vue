<template>
  <div class="page">
    <h1>{{ t('products.title') }}</h1>
    
    <div v-if="products.length === 0" class="empty-state">
      <p>{{ t('products.empty') }}</p>
    </div>
    
    <div v-else class="products-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
      >
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description" v-if="product.description">
            {{ product.description }}
          </p>
          <p class="product-price">{{ formatPrice(product.price) }}</p>
        </div>
        <button 
          @click="addToCart(product)" 
          class="add-to-cart-btn"
        >
          {{ t('common.add') }}
        </button>
      </div>
    </div>
    
    <div v-if="cartTotalCount > 0" class="cart-info">
      <p>{{ t('cart.itemsInCart') }}: <strong>{{ cartTotalCount }}</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const productsStore = useProductsStore()
const cartStore = useCartStore()

// Використовуємо storeToRefs для реактивності
const { items: products } = storeToRefs(productsStore)
const { totalCount: cartTotalCount } = storeToRefs(cartStore)

const addToCart = (product: { id: number; name: string; price: number }) => {
  // Конвертуємо name в title для кошика
  cartStore.add({
    id: product.id,
    title: product.name,
    price: product.price
  })
}

const formatPrice = (price: number): string => {
  return `${price} ₴`
}
</script>

<style scoped>
.page {
  padding: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.product-card {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #42b883;
}

.product-info {
  flex: 1;
}

.product-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.product-description {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.product-price {
  margin: 1rem 0 0 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
}

.add-to-cart-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.add-to-cart-btn:hover {
  background-color: #35a372;
}

.add-to-cart-btn:active {
  transform: scale(0.98);
}

.cart-info {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 6px;
  text-align: center;
}

.cart-info p {
  margin: 0;
  color: #666;
}

.cart-info strong {
  color: #42b883;
  font-size: 1.2rem;
}
</style>
