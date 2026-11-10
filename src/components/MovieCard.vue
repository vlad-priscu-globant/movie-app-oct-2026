<script setup lang="ts">
import type { Movie } from '../types'

const props = defineProps<{
  movie: Movie
  isFavorite?: boolean
}>()

const emit = defineEmits<{
  (e: 'selectMovie', movie: Movie): void
  (e: 'toggleFavorite', movieId: number): void
}>()

const handleCardClick = () => {
  emit('selectMovie', props.movie)
}

const handleFavoriteClick = (event: Event) => {
  event.stopPropagation()
  emit('toggleFavorite', props.movie.id)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.src = 'https://placehold.co/500x750/1e293b/ef4444?text=Poster+Indisponibil'
  }
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
        loading="lazy"
        decoding="async"
        @error="handleImageError"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      <!-- Favorite Button Overlay -->
      <button 
        @click="handleFavoriteClick"
        type="button"
        class="absolute top-2 right-2 p-2 rounded-full bg-gray-900/80 hover:bg-red-600 text-white transition-colors"
        :title="isFavorite ? 'Șterge din favorite' : 'Adaugă la favorite'"
      >
        <span v-if="isFavorite" class="text-red-500 hover:text-white font-bold text-sm">★</span>
        <span v-else class="text-gray-300 font-bold text-sm">☆</span>
      </button>
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
