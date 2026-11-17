<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="relative w-full md:w-1/2">
    <input 
      :value="modelValue" 
      @input="handleInput"
      type="text" 
      :placeholder="placeholder || 'Caută...'" 
      class="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2.5 pr-10 rounded-lg border border-gray-700 focus:outline-hidden focus:border-red-600 transition-colors"
    />
    <button 
      v-if="modelValue"
      @click="handleClear"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
    >
      ✕
    </button>
  </div>
</template>
