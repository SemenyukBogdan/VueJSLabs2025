<template>
  <div class="page">
    <h1>{{ t('nav.cart') }}</h1>
    
    <div v-if="items.length === 0" class="empty-cart">
      <p>{{ t('cart.empty') }}</p>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div 
          v-for="item in items" 
          :key="item.id" 
          class="cart-item"
        >
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <div class="item-details">
              <span class="item-price">{{ formatPrice(item.price) }}</span>
              <span class="item-qty">{{ t('cart.quantity') }}: {{ item.qty }}</span>
              <span class="item-total">{{ t('cart.itemTotal') }}: {{ formatPrice(item.price * item.qty) }}</span>
            </div>
          </div>
          <button 
            @click="removeItem(item.id)" 
            class="remove-btn"
          >
            {{ t('common.remove') }}
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>{{ t('cart.totalItems') }}:</span>
          <strong>{{ totalCount }}</strong>
        </div>
        <div class="summary-row total">
          <span>{{ t('common.total') }}:</span>
          <strong>{{ formatPrice(totalPrice) }}</strong>
        </div>
      </div>
      
      <div class="cart-actions">
        <button 
          @click="clearCart" 
          class="clear-btn"
        >
          {{ t('common.clear') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const cartStore = useCartStore()

// Використовуємо storeToRefs для реактивності
const { items, totalCount, totalPrice } = storeToRefs(cartStore)

const removeItem = (itemId: number) => {
  cartStore.remove(itemId)
}

const clearCart = () => {
  cartStore.clear()
}

const formatPrice = (price: number): string => {
  return `${price} ₴`
}
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 800px;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.cart-items {
  margin-top: 2rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: border-color 0.2s;
}

.cart-item:hover {
  border-color: #42b883;
}

.item-info {
  flex: 1;
}

.item-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.item-details {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  color: #666;
}

.item-price,
.item-qty,
.item-total {
  font-size: 0.95rem;
}

.item-total {
  font-weight: 600;
  color: #42b883;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #c82333;
}

.cart-summary {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #5a6268;
  border-radius: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.summary-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #ddd;
  font-size: 1.3rem;
}

.summary-row strong {
  color: #42b883;
}

.cart-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.clear-btn {
  padding: 0.75rem 2rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-btn:hover {
  background-color: #c82333;
}
</style>
