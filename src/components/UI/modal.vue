<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
      <slot />
      <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean
})
</script>
