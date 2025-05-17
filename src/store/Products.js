import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    productsfiltrados: [],
    categorias: [],
    loading: false,
    error: null,
    tasadecambio: 0,
    currentpage: 1,
    itemsperpage: 5,
    categoriaseleccionada: 'all',
    pricerange: [0, 1000]
  }),

  actions: {
    async getProducts() {
      this.loading = true;
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);
        this.products = productsResponse.data;
        this.productsfiltrados = productsResponse.data;
        this.categorias = [...new Set(this.products.map(product => product.category))];
        await this.getExchangeRate();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async getExchangeRate() {
      try {
        const response = await axios.get('https://pydolarve.org/api/v2/dollar?monitor=enparalelovzla');
        this.tasadecambio = response.data.price;
      } catch (error) {
        this.error = error;
      }
    }
  }
});


