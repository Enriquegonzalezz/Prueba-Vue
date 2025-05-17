<script setup>
import useCurrency from '../../aditionals/ChangeCurrency'

const { formatCurrency } = useCurrency()

defineProps({
  product: {
    type: Object,
    required: true
  },
  exchangeRate: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <!-- Imagen del producto -->
    <div class="h-48 bg-gray-100 flex items-center justify-center p-4">
      <img 
        :src="product.image" 
        :alt="product.title"
        loading="lazy"  
        class="h-full object-contain"
      >
    </div>

    <!-- Contenido -->
    <div class="p-6">
      <!-- Categoría -->
      <span class="inline-block mb-2 px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
        {{ product.category }}
      </span>

      <!-- Título -->
      <h3 class="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
        {{ product.title }}
      </h3>

      <!-- Precios -->
      <div class="flex flex-col">
        <p class="text-xl font-bold text-gray-900">
          {{ formatCurrency(product.price) }}
        </p>
        <p class="text-sm text-gray-500">
          {{ formatCurrency(product.price * exchangeRate, 'VES') }}
        </p>
      </div>
    </div>
  </div>
</template>

