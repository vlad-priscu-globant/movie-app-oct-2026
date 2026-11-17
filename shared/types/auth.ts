import { z } from 'zod'

/**
 * Server-side credential contract. It stays permissive on purpose so the demo
 * users (`guest` / `student`) keep working until Supabase Auth lands in Session 08.
 */
export const credentialsSchema = z.object({
  email: z.string().trim().min(1, 'Email-ul este obligatoriu'),
  password: z.string().min(1, 'Parola este obligatorie'),
})

export type Credentials = z.infer<typeof credentialsSchema>

/** Stricter rules for the login form UI. Built on the server contract (DRY). */
export const loginFormSchema = credentialsSchema.extend({
  email: z.email('Adresa de email este invalidă'),
  password: z.string().min(6, 'Parola trebuie să conțină minim 6 caractere'),
})

export type LoginForm = z.infer<typeof loginFormSchema>

export const sessionUserSchema = z.object({
  username: z.string().min(1),
})

export type SessionUser = z.infer<typeof sessionUserSchema>
