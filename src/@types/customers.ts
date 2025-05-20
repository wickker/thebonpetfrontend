import { z } from 'zod'

export const EmailFormSchema = z.object({
  email: z.string().trim().email(),
})

export const CustomerLoginFormSchema = z
  .object({
    password: z.string().trim().min(1),
  })
  .merge(EmailFormSchema)

export type CustomerLoginForm = z.infer<typeof CustomerLoginFormSchema>
export type EmailForm = z.infer<typeof EmailFormSchema>
