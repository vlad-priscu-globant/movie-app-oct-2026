<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-gray-400" role="status">
    <div class="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
    <p>{{ message }}</p>
  </div>
</template>
