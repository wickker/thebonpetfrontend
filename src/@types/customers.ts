import { z } from 'zod'

export const CustomerLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type CustomerLoginForm = z.infer<typeof CustomerLoginFormSchema>
