<script setup>
import { productsStore } from '@/stores/products'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()

const decreaseQuantity = (product) => {
  store.removeFromCart(product)
  updateCart()
}

const cart = ref([])
const updateCart = () => {
  const cartData = localStorage.getItem('cart')
  cart.value = cartData ? JSON.parse(cartData) : []
}
updateCart()

const increaseQuantity = (product) => {
  store.addToCart(product)
  updateCart()
}
const groupedCart = computed(() => {
  const grouped = {}
  cart.value.forEach((item) => {
    const itemId = item.id
    if (!grouped[itemId]) {
      grouped[itemId] = { ...item, quantity: 1 }
    } else {
      grouped[itemId].quantity += 1
    }
  })
  return Object.values(grouped)
})
const vaciaCart = () => {
  store.cart = []
  localStorage.removeItem('cart')
  updateCart()
}
const confirmPurchase = () => {
  const confirmed = window.confirm('¿Estás seguro de que deseas realizar la compra?')
  if (confirmed) {
    store.cart = []
    localStorage.removeItem('cart')
    router.push('/')
  }
}
</script>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CartView'
})
</script>

<template>
  <section>
    <div>
      <button @click="router.go(-1)">Volver</button>
      <h2 style="text-align: center">Carrito</h2>
    </div>
    <div v-if="!store.cart.length" style="text-align: center">
      <p style="font-weight: 600">Carrito Vacio...</p>
    </div>
    <div v-else>
      <div class="cart-container">
        <div class="cart-item" v-for="item in groupedCart" :key="item.id">
          <div class="item-details">
            <img :src="item.thumbnail" alt="" />
            <div class="item-info">
              <span>{{ item.title }}</span>
              <p>Categoria: {{ item.category }}</p>
              <p>Precio: ${{ item.price }}</p>
            </div>

            <div class="buttons">
              <svg
                @click="decreaseQuantity(item)"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-minus"
              >
                <path d="M5 12h14" />
              </svg>

              <p>{{ item.quantity }}</p>
              <svg
                @click="increaseQuantity(item)"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-footer">
        <button @click="vaciaCart">Vaciar carrito</button>
        <button @click="confirmPurchase">Comprar</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 80px;
  gap: 50px;
}
.cart-container {
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
}

.cart-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-details span {
  font-weight: 600;
  text-transform: uppercase;
}

.item-details img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #458246;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  padding: 10px;
}

.lucide-minus {
  background-color: #f44336;
  color: white;
  border: none;

  border-radius: 5px;
  cursor: pointer;
}
.lucide-plus {
  background-color: #458246;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #d32;
}

.buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.cart-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 10px;
}
</style>
