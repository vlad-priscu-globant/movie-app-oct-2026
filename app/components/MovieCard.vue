<script setup lang="ts">
import type { Movie } from '#shared/types/movie'

const POSTER_PLACEHOLDER = '/poster-placeholder.svg'

const props = defineProps<{
  movie: Movie
  isFavorite?: boolean
}>()

const emit = defineEmits<{
  (e: 'selectMovie', movie: Movie): void
  (e: 'toggleFavorite', movieId: number): void
}>()

const hasImageError = ref(false)
const posterSrc = computed(() => (hasImageError.value || !props.movie.image ? POSTER_PLACEHOLDER : props.movie.image))
const favoriteLabel = computed(() => (props.isFavorite ? 'Șterge din favorite' : 'Adaugă la favorite'))

watch(() => props.movie.image, () => {
  hasImageError.value = false
})
</script>

<template>
  <article
    class="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all cursor-pointer border border-gray-700 hover:border-red-600 flex flex-col"
    @click="emit('selectMovie', movie)"
  >
    <div class="relative aspect-2/3 overflow-hidden bg-gray-900">
      <NuxtImg
        :src="posterSrc"
        :alt="movie.title"
        width="500"
        height="750"
        sizes="50vw sm:33vw md:25vw lg:20vw xl:16vw"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        @error="hasImageError = true"
      />
      <button
        type="button"
        :title="favoriteLabel"
        :aria-label="favoriteLabel"
        :aria-pressed="isFavorite"
        class="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-lg text-red-500 hover:bg-black/80 transition-colors cursor-pointer"
        @click.stop="emit('toggleFavorite', movie.id)"
      >{{ isFavorite ? '★' : '☆' }}</button>
    </div>

    <div class="p-4 flex flex-col justify-between grow">
      <div>
        <h3 class="text-lg font-bold text-white group-hover:text-red-500 transition-colors leading-tight line-clamp-1">
          {{ movie.title }}
        </h3>
        <p class="text-gray-400 text-sm mt-1">{{ movie.year ?? '—' }}</p>
      </div>

      <div class="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
        <span>Vezi detalii</span>
        <span class="text-red-500 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  </article>
</template>
