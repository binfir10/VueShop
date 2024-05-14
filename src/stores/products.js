
import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
  }),

  actions: {
    fetchProductsFromDB() {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
          this.products = json.products;
        })
    },
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
        this.cart.push(existingProduct);
      } else {
        product.quantity = 1;
        this.cart.push(product);
      }
      this.saveCartToLocalStorage();

    },
    removeFromCart(product) {
      const existingProductIndex = this.cart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        if (this.cart[existingProductIndex].quantity > 1) {
          this.cart[existingProductIndex].quantity--;
        } else {
          this.cart.splice(existingProductIndex, 1);
        }
        this.saveCartToLocalStorage();
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    loadCartFromLocalStorage() {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.cart = JSON.parse(cartData);
      }
    },

  }
});
