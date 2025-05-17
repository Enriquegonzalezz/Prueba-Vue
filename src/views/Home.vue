<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../store/Products'
import useCurrency from '../aditionals/ChangeCurrency'

import Stats from '../components/tablero/Stats.vue'
import FiltersBar from '../components/tablero/FiltersBar.vue'
import Loader from '../components/UI/Loader.vue'
import ErrorMessage from '../components/UI/ErrorMessage.vue'
import ProductGrid from '../components/Products/ProductGrid.vue'
import Pagination from '../components/Products/Pagination.vue'

const store = useProductsStore()
const { formattedExchangeRate, exchangeRate } = useCurrency()

onMounted(() => {
  store.getProducts()
})

// Filtros reactivos
const selectedCategory = ref('all')
const priceRange = ref([0, 1000])

const uniqueCategories = computed(() => store.categorias)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const itemsPerPage = computed(() => store.itemsperpage)
const currentPage = ref(1)

// Filtrar productos
const filteredProducts = computed(() => {
  let products = store.products
  if (selectedCategory.value !== 'all') {
    products = products.filter(p => p.category === selectedCategory.value)
  }
  products = products.filter(
    p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  )
  return products
})

// Paginación
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredProducts.value.slice(start, start + itemsPerPage.value)
})

function handlePageChange(page) {
  currentPage.value = page
}

function applyFilters() {
  currentPage.value = 1
}

// Estadísticas
const statsData = computed(() => ({
  totalProducts: filteredProducts.value.length,
  uniqueCategories: uniqueCategories.value.length,
  averagePrice:
    filteredProducts.value.length > 0
      ? (
          filteredProducts.value.reduce((sum, p) => sum + p.price, 0) /
          filteredProducts.value.length
        )
      : 0
}))
</script>