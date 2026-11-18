<script setup lang="ts">
import { loginFormSchema } from '#shared/types/auth'
import type { LoginForm } from '#shared/types/auth'

useSeoMeta({ title: 'Autentificare | MovieApp' })

const route = useRoute()
const { isAuthenticated, login, register } = useAuth()

const form = ref<LoginForm>({ email: '', password: '' })
const errors = reactive<Record<keyof LoginForm, string>>({ email: '', password: '' })
const isSignUp = ref(false)
const submitError = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

watch(() => form.value.email, () => {
  errors.email = ''
  submitError.value = ''
})
watch(() => form.value.password, () => {
  errors.password = ''
  submitError.value = ''
})

/** Only same-origin relative paths, which blocks open redirects (e.g. `//evil.com`). */
const redirectTarget = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
})

watchEffect(async () => {
  if (isAuthenticated.value) {
    await navigateTo(redirectTarget.value)
  }
})

function toggleMode(): void {
  isSignUp.value = !isSignUp.value
  submitError.value = ''
  successMessage.value = ''
  errors.email = ''
  errors.password = ''
}

async function handleSubmit(): Promise<void> {
  submitError.value = ''
  successMessage.value = ''
  const result = loginFormSchema.safeParse(form.value)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    errors.email = fieldErrors.email?.[0] ?? ''
    errors.password = fieldErrors.password?.[0] ?? ''
    return
  }

  isSubmitting.value = true
  try {
    if (isSignUp.value) {
      const { needsEmailConfirmation } = await register(result.data)
      if (needsEmailConfirmation) {
        successMessage.value = 'Cont creat! Verifică adresa de email pentru confirmare, apoi autentifică-te.'
        isSignUp.value = false
        form.value.password = ''
      } else {
        await navigateTo(redirectTarget.value)
      }
    } else {
      await login(result.data)
      await navigateTo(redirectTarget.value)
    }
  } catch (error) {
    submitError.value = error instanceof Error
      ? error.message
      : 'Email sau parolă incorecte.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
    <h1 class="text-2xl font-bold mb-6 text-center text-white">
      {{ isSignUp ? 'Creare Cont' : 'Autentificare' }}
    </h1>

    <p
      v-if="successMessage"
      class="mb-4 text-center text-sm font-medium text-green-400 bg-green-950/50 p-3 rounded-lg border border-green-800"
      role="status"
    >
      {{ successMessage }}
    </p>

    <form class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
      <div>
        <label for="login-email" class="block text-sm font-medium text-gray-400 mb-1">Email</label>
        <input
          id="login-email"
          v-model="form.email"
          type="email"
          autocomplete="username"
          placeholder="exemplu@adresa.ro"
          class="w-full bg-gray-950 text-white placeholder-gray-600 px-4 py-2 rounded-lg border focus:outline-hidden transition-colors"
          :class="errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-red-600'"
        >
        <p v-if="errors.email" class="text-red-500 text-xs mt-1.5 font-medium">{{ errors.email }}</p>
      </div>

      <div>
        <label for="login-password" class="block text-sm font-medium text-gray-400 mb-1">Parolă</label>
        <input
          id="login-password"
          v-model="form.password"
          type="password"
          :autocomplete="isSignUp ? 'new-password' : 'current-password'"
          placeholder="••••••"
          class="w-full bg-gray-950 text-white placeholder-gray-600 px-4 py-2 rounded-lg border focus:outline-hidden transition-colors"
          :class="errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-red-600'"
        >
        <p v-if="errors.password" class="text-red-500 text-xs mt-1.5 font-medium">{{ errors.password }}</p>
      </div>

      <p v-if="submitError" class="text-red-400 text-sm font-medium text-center" role="alert">{{ submitError }}</p>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="mt-4 text-white font-semibold py-2.5 rounded-lg transition-all bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        {{ isSubmitting ? 'Se procesează...' : (isSignUp ? 'Creează cont' : 'Intră în cont') }}
      </button>

      <button
        type="button"
        class="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        @click="toggleMode"
      >
        {{ isSignUp ? 'Ai deja cont? Autentifică-te' : 'Nu ai cont? Creează unul' }}
      </button>
    </form>
  </div>
</template>
