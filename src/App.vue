<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductsStore } from './store/Products'
import useCurrency from './aditionals/ChangeCurrency'
import Stats from './components/tablero/Stats.vue'
import FiltersBar from './components/tablero/FiltersBar.vue'
import { useRoute, useRouter } from 'vue-router'
import Loader from './components/UI/Loader.vue'
import ErrorMessage from './components/UI/ErrorMessage.vue'
import ProductGrid from './components/Products/ProductGrid.vue'
import Pagination from './components/Products/Pagination.vue'

const store = useProductsStore()
const { 
  exchangeRate, 
  formattedExchangeRate, 
  usdToVes, 
  formatCurrency,
  isLoading: currencyLoading,
  error: currencyError
} = useCurrency()

const route = useRoute()
const router = useRouter()

// Estados reactivos para los filtros
const filters = ref({
  category: 'all',
  priceRange: [0, 1000]
})

const FILTERS_STORAGE_KEY = 'app-filters'


const currentPage = ref(1)
const itemsPerPage = 5

//Propiedades computadas
const uniqueCategories = computed(() => store.categorias || [])
const loading = computed(() => store.loading || currencyLoading.value)

const error = computed(() => store.error || currencyError.value)

const maxPriceLimit = computed(() => {
  if (!store.products?.length) return 1000
  return Math.max(...store.products.map(p => p.price))
})

// Productos filtrados (con su actualización automática)
const filteredProducts = computed(() => {
  if (!store.products?.length) return []
  
  return store.products.filter(product => {
    const categoryMatch = filters.value.category === 'all' || product.category === filters.value.category
    const priceMatch = product.price >= filters.value.priceRange[0] && 
                      product.price <= filters.value.priceRange[1]
    return categoryMatch && priceMatch
  })
})

//Productos paginados
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

//Estadísticas
const statsData = computed(() => ({
  totalProducts: filteredProducts.value.length,
  uniqueCategories: uniqueCategories.value.length,
  averagePrice: filteredProducts.value.length > 0 
    ? formatCurrency(
        filteredProducts.value.reduce((sum, p) => sum + p.price, 0) / 
        filteredProducts.value.length,
        { currency: 'USD' }
      )
    : formatCurrency(0, { currency: 'USD' })
}))

//Métodos
function handlePageChange(page) {
  currentPage.value = page
}

function applyFilters() {
  currentPage.value = 1
  // Actualizar URL según categoría seleccionada
  if (filters.value.category === 'all') {
    router.push({ path: '/' })
  } else {
    router.push({ path: `/Products/${filters.value.category}` })
  }
  console.log('Filtros aplicados:', filters.value)
}

//Hook
onMounted(() => {
  store.getProducts()

 const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY)
  if (savedFilters) {
    try {
      filters.value = JSON.parse(savedFilters)
    } catch (e) {
      console.warn('Error parsing saved filters from localStorage', e)
    }
  }
  
  //Si la URL tiene alguna de las 4 categorías, sincronizar filtro
  if (route.params.category) {
    filters.value.category = route.params.category
  }
})


//Guardar filtros en localStorage cuando cambien
watch(filters, (newFilters) => {
  localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(newFilters))
}, { deep: true })



//Vigilar cambios en la ruta para actualizar filtro categoría
watch(
  () => route.params.category,
  (newCategory) => {
    if (newCategory) {
      filters.value.category = newCategory
    } else {
      filters.value.category = 'all'
    }
  }
)

//Vigilar cambios en filtros para resetear página y actualizar productos
watch(
  () => filters.value,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header: Estadísticas -->
    <header class="bg-indigo-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold mb-2">Tablero retail - Enrique González</h1>
        <Stats :stats="statsData" />
      </div>
    </header>

    <!-- Content: Listado de productos -->
    <main class="flex-1 container mx-auto px-4 py-8 ">
      <Loader v-if="loading" />
      <ErrorMessage v-else-if="error" :message="error" />
      
      <template v-else>
        <ProductGrid
          :products="paginatedProducts"
          :formatCurrency="formatCurrency"
          :usdToVes="usdToVes"
        />
        <Pagination
          v-if="filteredProducts.length > itemsPerPage"
          :currentPage="currentPage"
          :totalItems="filteredProducts.length"
          :itemsPerPage="itemsPerPage"
          @pageChange="handlePageChange"
        />
        
        <div class="mt-4 text-right text-sm text-gray-500 flex justify-center items-center">
          <span>{{ formattedExchangeRate }}</span>
        </div>
      </template>
    </main>

    <!-- Footer: Filtros -->
    <footer class="bg-white border-t py-4">
      <div class="container mx-auto px-4">
        <FiltersBar
          :categories="uniqueCategories"
          :maxPriceLimit="maxPriceLimit"
          v-model="filters"
          @applyFilters="applyFilters"
        />
      </div>
    </footer>
  </div>
</template>
