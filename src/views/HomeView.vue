<script setup lang="ts">
// În Sesiunea 03 ne concentrăm pe structura statică (UI Architecture) și CSS Grid.
// Nu folosim încă directive Vue precum v-for sau reactive state. Ele vor fi predate în Sesiunea 04.
import MovieListItem from "../components/MovieListItem.vue";
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8 text-center sm:text-left">
      <h2 class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
        Filme Populare
      </h2>
      <p class="text-gray-400 mt-2 text-sm">
        Explorează structura statică a grid-ului nostru de filme (Machetarea cu CSS Grid).
      </p>
    </div>

    <!-- Grid static responsive (CSS Grid) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      <movie-list-item title="asd">
        <slot><p>1111</p></slot>
        <template v-slot:extraInfo>
          <p>22222</p>
        </template>
      </movie-list-item>
      <!-- Film 1: Interstellar -->
      <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
          <img
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop"
            alt="Interstellar"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
          <div>
            <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
              Interstellar
            </h3>
            <span class="text-xs text-gray-500 font-medium block mt-1">2014</span>
          </div>
        </div>
      </article>

      <!-- Film 2: Inception -->
      <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
          <img 
            src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop" 
            alt="Inception" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
          <div>
            <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
              Inception
            </h3>
            <span class="text-xs text-gray-500 font-medium block mt-1">2010</span>
          </div>
        </div>
      </article>

      <!-- Film 3: The Dark Knight -->
      <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
          <img 
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=400&auto=format&fit=crop" 
            alt="The Dark Knight" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
          <div>
            <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
              The Dark Knight
            </h3>
            <span class="text-xs text-gray-500 font-medium block mt-1">2008</span>
          </div>
        </div>
      </article>

      <!-- Film 4: Whiplash -->
      <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" 
            alt="Whiplash" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
          <div>
            <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
              Whiplash
            </h3>
            <span class="text-xs text-gray-500 font-medium block mt-1">2014</span>
          </div>
        </div>
      </article>

      <!-- Film 5: Into the Spider-Verse -->
      <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
          <img 
            src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400&auto=format&fit=crop" 
            alt="Spider-Man" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
          <div>
            <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
              Spider-Man: Into the Spider-Verse
            </h3>
            <span class="text-xs text-gray-500 font-medium block mt-1">2018</span>
          </div>
        </div>
      </article>

      <!-- Film 6: Dune: Part Two -->
      <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
          <img 
            src="https://images.unsplash.com/photo-1547483238-2cbf88bc1459?q=80&w=400&auto=format&fit=crop" 
            alt="Dune 2" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
          <div>
            <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
              Dune: Part Two
            </h3>
            <span class="text-xs text-gray-500 font-medium block mt-1">2024</span>
          </div>
        </div>
      </article>

    </div>
  </div>
</template>

<style scoped>
</style>