<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CatalogView'
})
</script>

<script setup>
import { onMounted } from 'vue'
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()

const goToProductPage = (id) => {
  router.push({ name: 'ProductView', params: { id } })
}

onMounted(async () => {
  console.log('Catalog Mounted')
  await store.fetchProductsFromDB()
  store.loadCartFromLocalStorage()
})
</script>

<template>
  <h1>Productos</h1>
  <div class="product-list">
    <div
      class="product"
      v-for="product in store.products"
      :key="product.id"
      @click="goToProductPage(product.id)"
    >
      <img :src="product.thumbnail" alt="" />
      <p>${{ product?.price }}</p>
      <h2>{{ product?.title }}</h2>
      <p>Descripcion: {{ product?.description }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
  color: #333;
  text-shadow: 1px 1px 1px #ccc;
}
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product {
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  background: #f9f9f9;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.5);
}

.product:hover {
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.7);
  transform: scale(1.01);
  transition: 0.3s;
}

.product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
