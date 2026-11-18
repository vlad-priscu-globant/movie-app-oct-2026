import { z } from 'zod'

/** Shared auth credential contract for Supabase email + password flows. */
export const loginFormSchema = z.object({
  email: z.string().trim().min(1, 'Email-ul este obligatoriu').pipe(z.email('Adresa de email este invalidă')),
  password: z.string().min(6, 'Parola trebuie să conțină minim 6 caractere'),
})

export type LoginForm = z.infer<typeof loginFormSchema>
export type Credentials = LoginForm

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  username: z.string().min(1),
})

export type SessionUser = z.infer<typeof sessionUserSchema>

export interface SignUpResult {
  needsEmailConfirmation: boolean
}
