<script setup>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { productsStore } from './stores/products'
import { onMounted } from 'vue'
const router = useRouter()
const store = productsStore()
onMounted(async () => {
  console.log('Catalog Mounted')
  await store.fetchProductsFromDB()
  store.loadCartFromLocalStorage()
})
</script>

<template>
  <body>
    <header>
      <h1 @click="router.push({ name: 'Catalog' })">VueShop</h1>
      <nav class="cart-item" @click="router.push({ name: 'CartView' })">
        <div class="item-details">
          <img src="./assets/cart.png" alt="" />
          <p>{{ store.cart.length }}</p>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <p>&copy; 2024 VueShop</p>
    </footer>
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: space-around;
  height: 60px;
  align-items: center;
  background: #458246;
  color: #fff;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  flex: 1 1 auto;
}

header h1 {
  cursor: pointer;
}

.cart-item {
  display: flex;

  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-details img {
  width: 30px;
  height: 30px;
}

.item-details p {
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
}

main {
  margin-top: 80px;
  flex: 1 1 0%;
}

footer {
  height: 60px;
  max-height: 60px;
  text-align: center;
  background: #458246;
  color: #fff;
  flex: 1 1 auto;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  width: 100%;
  bottom: 0;
}
</style>
