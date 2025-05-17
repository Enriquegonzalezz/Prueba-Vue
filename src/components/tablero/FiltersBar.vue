<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  maxPriceLimit: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      category: 'all',
      priceRange: [0, 1000]
    })
  }
})

const emit = defineEmits(['update:modelValue', 'applyFilters'])

const localFilters = ref({ ...props.modelValue })

// Variables para inputs temporales (tipo string para permitir borrar)
const tempMin = ref(localFilters.value.priceRange[0].toString())
const tempMax = ref(localFilters.value.priceRange[1].toString())

// Sincronizar temp con props.modelValue cuando cambie externamente
watch(() => props.modelValue, (newVal) => {
  localFilters.value = { ...newVal }
  tempMin.value = newVal.priceRange[0].toString()
  tempMax.value = newVal.priceRange[1].toString()
}, { deep: true })

// Validar y actualizar filtro cuando el usuario termina de editar (blur)
const onMinBlur = () => {
  let min = Number(tempMin.value)
  let max = localFilters.value.priceRange[1]

  if (isNaN(min) || min < 0) min = 0
  if (min > max) min = max

  localFilters.value.priceRange[0] = min
  tempMin.value = min.toString()

  emit('update:modelValue', { ...localFilters.value })
  emit('applyFilters')
}

const onMaxBlur = () => {
  let max = Number(tempMax.value)
  let min = localFilters.value.priceRange[0]

  if (isNaN(max) || max > props.maxPriceLimit) max = props.maxPriceLimit
  if (max < min) max = min

  localFilters.value.priceRange[1] = max
  tempMax.value = max.toString()

  emit('update:modelValue', { ...localFilters.value })
  emit('applyFilters')
}
</script>

<template>
  <div class="space-y-6 p-4 bg-white rounded-lg shadow">
    <!-- Filtro por categoría -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
      <select
        v-model="localFilters.category"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        @change="() => { emit('update:modelValue', localFilters); emit('applyFilters') }"
      >
        <option value="all">Todas las categorías</option>
        <option 
          v-for="category in categories" 
          :key="category" 
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Filtro por rango de precios -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Rango de precios</label>
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <label class="block text-xs text-gray-500 mb-1">Mínimo</label>
          <input
            type="number"
            v-model="tempMin"
            min="0"
            class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            @blur="onMinBlur"
          >
        </div>
        
        <span class="mt-5">-</span>
        
        <div class="flex-1">
          <label class="block text-xs text-gray-500 mb-1">Máximo</label>
          <input
            type="number"
            v-model="tempMax"
            max="maxPriceLimit"
            class="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            @blur="onMaxBlur"
          >
        </div>
      </div>
      
      <div class="mt-2 flex justify-between text-xs text-gray-500">
        <span>Límites: $0 - ${{ maxPriceLimit.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>
