<script setup lang="ts">
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="bg-red-950/50 border border-red-800 p-6 rounded-xl text-center text-red-400" role="alert">
    <p class="text-lg font-semibold mb-2">Eroare</p>
    <p>{{ message }}</p>
    <button
      type="button"
      class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium cursor-pointer"
      @click="emit('retry')"
    >
      Reîncearcă
    </button>
  </div>
</template>
