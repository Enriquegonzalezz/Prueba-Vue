
<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalItems: Number,
  itemsPerPage: Number
})

const emit = defineEmits(['pageChange'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const current = props.currentPage
  const total = totalPages.value
  
  // Mostrar máximo 5 páginas con lógica de ellipsis
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }
  
  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }
  
  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }
  
  return [1, '...', current - 1, current, current + 1, '...', total]
})

function handlePageChange(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('pageChange', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 py-8">
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &lt;
    </button>
    
    <template v-for="(page, index) in visiblePages" :key="index">
      <template v-if="page === '...'">
        <span class="px-2">...</span>
      </template>
      <button
        v-else
        @click="handlePageChange(page)"
        :class="currentPage === page ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out'"
        class="px-4 py-2 rounded-md"
      >
        {{ page }}
      </button>
    </template>
    
    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
    >
      &gt;
    </button>
  </div>
</template>