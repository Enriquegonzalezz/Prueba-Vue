<script setup>
import { ref } from 'vue'

defineProps({
  products: Array,
  formatCurrency: Function,
  usdToVes: Function
})

const showModal = ref(false)
const selectedProduct = ref(null)

function openModal(product) {
  selectedProduct.value = product
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedProduct.value = null
}
</script>

<template>
  <div>
    <!-- Grid de productos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow hover:-translate-y-3 transition-transform" 
      >
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="w-full h-48 object-contain bg-white p-4"
          loading="lazy"
        >
        <div class="p-4">
          <h3 class="text-lg font-semibold line-clamp-1">{{ product.title }}</h3>
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
            {{ product.category }}
          </span>
          
          <div class="mt-4 flex justify-between items-center">
            <div>
              <p class="text-indigo-600 font-bold">
                {{ formatCurrency(product.price, { currency: 'USD' }) }}
              </p>
              <p class="text-green-600 text-sm">
                {{ formatCurrency(usdToVes(product.price), { currency: 'VES' }) }}
              </p>
            </div> 
            <button
              @click="openModal(product)"
              class="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group"
            >
              <span
                class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-56 group-hover:h-56"
              ></span>
              <span class="absolute bottom-0 left-0 h-full -ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-auto h-full opacity-100 object-stretch"
                  viewBox="0 0 487 487"
                >
                  <path
                    fill-opacity=".1"
                    fill-rule="nonzero"
                    fill="#FFF"
                    d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                  ></path>
                </svg>
              </span>
              <span class="absolute top-0 right-0 w-12 h-full -mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="object-cover w-full h-full"
                  viewBox="0 0 487 487"
                >
                  <path
                    fill-opacity=".1"
                    fill-rule="nonzero"
                    fill="#FFF"
                    d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                  ></path>
                </svg>
              </span>
              <span class="relative text-base font-semibold">Ver Detalles</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
        <p class="text-lg font-semibold mb-4">Tienda en desarrollo</p>
        <button 
          @click="closeModal" 
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
