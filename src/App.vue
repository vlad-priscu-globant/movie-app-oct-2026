<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
    <!-- Header Semantic -->
    <header class="flex justify-between items-center p-4 bg-linear-to-b from-black via-zinc-950 to-transparent sticky top-0 z-50">
      <RouterLink to="/" class="text-3xl font-bold text-red-600 hover:text-red-500 transition-colors">
        MovieApp
      </RouterLink>
      <nav class="flex gap-4 items-center">
        <RouterLink 
          to="/login" 
          class="text-sm bg-red-600 px-5 py-1.5 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all text-white"
        >
          Autentificare
        </RouterLink>
      </nav>
    </header>
    
    <!-- Zona Principală de Conținut (Rutele se încarcă aici) -->
    <main class="flex-grow p-6">
      <RouterView />
    </main>

    <!-- Footer Semantic -->
    <footer class="text-center text-gray-500 text-xs p-6 border-t border-zinc-900 bg-zinc-950/30">
      &copy; 2026 MovieApp. Toate drepturile rezervate.
    </footer>
  </div>
</template>