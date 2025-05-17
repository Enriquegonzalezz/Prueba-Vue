

<script setup>
import { XCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-red-50 border-l-4 border-red-400 p-4">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" />
      </div>
      <div class="ml-3">
        <p class="text-sm text-red-700">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>
