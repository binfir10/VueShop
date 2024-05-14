<template>
  <section>
    <button @click="router.go(-1)" style="width: 100px">Volver</button>
    <article>
      <img :src="selectedProduct?.thumbnail" alt="" />
      <div class="product">
        <p style="text-decoration: underline">{{ selectedProduct?.category }}</p>
        <h2>{{ selectedProduct?.title }}</h2>
        <span>⭐ {{ selectedProduct?.rating }}</span>
        <div class="product-details">
          <p>Marca: {{ selectedProduct?.brand }}</p>
          <p>Descripcion: {{ selectedProduct?.description }}</p>
          <span>Price: $ {{ selectedProduct?.price }}</span>
          <span>Stock: {{ selectedProduct?.stock }}</span>
          <button @click="addToCart" style="margin-top: 20px">Add to Cart</button>
        </div>
      </div>
    </article>
    <div class="image-carousel">
      <img :src="image" alt="" v-for="(image, index) in selectedProduct?.images" :key="index" />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { productsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
onMounted(async () => {
  console.log('Catalog Mounted')
  await store.fetchProductsFromDB()
  store.loadCartFromLocalStorage()
})
const store = productsStore()
const router = useRouter()
const route = useRoute()

const selectedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id))
})

const addToCart = () => {
  store.addToCart(selectedProduct.value)
}
</script>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductDetails'
})
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 80px;
  gap: 50px;
}
article {
  margin-top: 80px;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
}
.product {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product p {
  text-transform: capitalize;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 3px;
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

button:hover {
  background-color: #458230;
}

img {
  width: 900px;
  height: auto;
  max-width: 900px;
  object-fit: cover;
  padding: 3px;
  border-radius: 2%;
}

.image-carousel {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  scroll-snap-type: x mandatory;
  max-width: 1200px;
  flex-wrap: wrap;
}

.image-carousel img {
  width: 300px;
  height: auto;
  scroll-snap-align: center;
  cursor: pointer;
  margin: 0 5px;
  object-fit: cover;
}
</style>
