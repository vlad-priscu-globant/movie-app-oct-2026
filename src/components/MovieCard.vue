<script setup lang="ts">
import type { Movie } from '../types'

const props = defineProps<{
  movie: Movie
}>()

const emit = defineEmits<{
  (e: 'selectMovie', movie: Movie): void
}>()

const handleCardClick = () => {
  emit('selectMovie', props.movie)
}
</script>

<template>
  <div 
    @click="handleCardClick"
    class="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all cursor-pointer border border-gray-700 hover:border-red-600 flex flex-col"
  >
    <!-- Poster Image -->
    <div class="relative aspect-[2/3] overflow-hidden bg-gray-900">
      <img 
        :src="movie.image" 
        :alt="movie.title" 
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col justify-between flex-grow">
      <div>
        <h3 class="text-lg font-bold text-white group-hover:text-red-500 transition-colors leading-tight line-clamp-1">
          {{ movie.title }}
        </h3>
        <p class="text-gray-400 text-sm mt-1">{{ movie.year }}</p>
      </div>
      
      <div class="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
        <span>Vezi detalii</span>
        <span class="text-red-500 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  </div>
</template>
