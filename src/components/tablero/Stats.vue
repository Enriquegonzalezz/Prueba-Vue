<script setup>
defineProps({
  stats: Object
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-900 transition duration-300">
      <h3 class="text-sm font-medium text-indigo-100">Productos Totales</h3>
      <p class="text-2xl font-bold text-white">{{ stats.totalProducts }}</p>
    </div>
    
    <div class="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-900 transition duration-300">
      <h3 class="text-sm font-medium text-indigo-100">Categorías Únicas</h3>
      <p class="text-2xl font-bold text-white">{{ stats.uniqueCategories }}</p>
    </div>
    
    <div class="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-900 transition duration-300">
      <h3 class="text-sm font-medium text-indigo-100">Precio Promedio</h3>
      <p class="text-2xl font-bold text-white">{{ stats.averagePrice }}</p>
    </div>
  </div>
</template>