<script setup lang="ts">
import type { UserCredentials } from '../types';

// În această sesiune ne concentrăm pe arhitectura statică și stilizare
const handleLogin = (e: Event) => {
  // exempla of getting a value form a form
  // console.log(e.target[0].value)
  e.preventDefault();
  
  // Demonstrăm utilizarea tipului UserCredentials în TypeScript
  const credentials: UserCredentials = {
    email: "user@example.com",
    password: "password123"
  };
  
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[75vh] px-4">
    <div class="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-lg shadow-2xl">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
          Bun venit înapoi
        </h2>
        <p class="text-gray-400 text-sm mt-2">
          Introdu datele tale pentru a accesa contul.
        </p>
      </div>

      <form @submit="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Adresă de Email
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="nume@exemplu.com" 
            required
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-hidden focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all text-sm"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label for="password" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Parolă
            </label>
            <a href="#" class="text-xs text-red-500 hover:underline">Ai uitat parola?</a>
          </div>
          <input 
            type="password" 
            id="password" 
            placeholder="••••••••" 
            required
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-hidden focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all text-sm"
          />
        </div>

        <div class="flex items-center">
          <input 
            id="remember-me" 
            type="checkbox" 
            class="h-4 w-4 rounded-sm bg-zinc-950 border-zinc-800 text-red-600 focus:ring-0"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-400 select-none">
            Ține-mă minte pe acest dispozitiv
          </label>
        </div>

        <button 
          type="submit" 
          class="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-600/20 transition-all duration-200 mt-6 text-sm"
        >
          Conectare
        </button>
      </form>

      <div class="text-center mt-6 pt-6 border-t border-zinc-850">
        <p class="text-sm text-gray-500">
          Nu ai un cont încă? 
          <a href="#" class="text-red-500 hover:underline font-medium">Creează cont nou</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Însoțit integral de Tailwind utility classes */
</style>