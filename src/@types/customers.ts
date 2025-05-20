import { z } from 'zod'

export const EmailFormSchema = z.object({
  email: z.string().trim().email(),
})

export const CustomerLoginFormSchema = z
  .object({
    password: z.string().trim().min(1),
  })
  .merge(EmailFormSchema)

export const SubmitNewPasswordFormSchema = z
  .object({
    password: z.string().trim().min(1),
    confirmPassword: z.string().trim().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type CustomerLoginForm = z.infer<typeof CustomerLoginFormSchema>
export type EmailForm = z.infer<typeof EmailFormSchema>
export type SubmitNewPasswordForm = z.infer<typeof SubmitNewPasswordFormSchema>
export type SubmitNewPasswordFormSchema = z.infer<
  typeof SubmitNewPasswordFormSchema
>
