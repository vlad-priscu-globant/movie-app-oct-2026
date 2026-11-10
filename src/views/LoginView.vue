<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { z } from 'zod'

// 1. Definim schema Zod
const loginSchema = z.object({
  //TODO give this to an ai to fix it.
  email: z.string().min(1, 'Email-ul este obligatoriu').email('Adresa de email este invalidă'),
  password: z.string().min(6, 'Parola trebuie să conțină minim 6 caractere')
})

// 1.5. Inferare tip TypeScript din schema Zod
type LoginForm = z.infer<typeof loginSchema>

// 2. State formular
// Folosim ref pentru a demonstra lucrul cu ref-uri pe obiecte (necesită .value în JS)
const form = ref<LoginForm>({
  email: '',
  password: ''
})

// Folosim reactive pentru a demonstra starea grupată fără .value
const errors = reactive<Record<keyof LoginForm, string>>({
  email: '',
  password: ''
})

// 3. Watchers: Curățăm erorile când utilizatorul reîncepe să scrie
// Monitorizăm proprietățile din interiorul ref-ului folosind funcții getter (.value.prop)
watch(() => form.value.email, () => {
  if (errors.email) errors.email = ''
})
watch(() => form.value.password, () => {
  if (errors.password) errors.password = ''
})

// 4. Computed: Verificăm silențios dacă formularul este valid (pentru a debloca butonul)
// const isFormValid = computed(() => {
//   return loginSchema.safeParse(form.value).success
// })

// 5. Validare finală la Submit
const handleLogin = () => {
  const result = loginSchema.safeParse(form.value)
  
  if (!result.success) {
    // Extragem erorile din Zod și le punem în starea de erori
    const formattedErrors = result.error.format()
    errors.email = formattedErrors.email?._errors[0] || ''
    errors.password = formattedErrors.password?._errors[0] || ''
    return
  }

  console.log('Formular valid! Date trimise către API:', { email: result.data.email })
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Autentificare</h2>
    
    <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
        <input 
          v-model="form.email"
          type="text" 
          placeholder="exemplu@adresa.ro"
          class="w-full bg-gray-950 text-white placeholder-gray-600 px-4 py-2 rounded-lg border focus:outline-hidden transition-colors"
          :class="errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-red-600'"
        />
        <p v-if="errors.email" class="text-red-500 text-xs mt-1.5 font-medium">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-1">Parolă</label>
        <input 
          v-model="form.password"
          type="password" 
          placeholder="••••••"
          class="w-full bg-gray-950 text-white placeholder-gray-600 px-4 py-2 rounded-lg border focus:outline-hidden transition-colors"
          :class="errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-red-600'"
        />
        <p v-if="errors.password" class="text-red-500 text-xs mt-1.5 font-medium">{{ errors.password }}</p>
      </div>

      <button
        type="submit" 
        class="mt-4 text-white font-semibold py-2.5 rounded-lg transition-all bg-red-600 hover:bg-red-700 active:scale-95"
      >
        Intră în cont
      </button>
    </form>
  </div>
</template>