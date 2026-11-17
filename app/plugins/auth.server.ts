/**
 * Resolves the session user once per SSR request (the cookie is forwarded by
 * `useRequestFetch`). The client receives it through the `useState` payload.
 */
export default defineNuxtPlugin(async () => {
  await useAuth().fetchUser()
})
