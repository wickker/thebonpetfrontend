import { z } from 'zod'

export const EmailFormSchema = z.object({
  email: z.string().trim().email(),
})

export const PasswordFormSchema = z.object({
  password: z.string().trim().min(6),
})

export const CustomerLoginFormSchema = PasswordFormSchema.merge(EmailFormSchema)

export const SubmitNewPasswordFormSchema = z
  .object({
    confirmPassword: z.string().trim().min(6),
  })
  .merge(PasswordFormSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const CustomerSignUpFormSchema = CustomerLoginFormSchema.merge(
  z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  })
)

export type CustomerLoginForm = z.infer<typeof CustomerLoginFormSchema>
export type EmailForm = z.infer<typeof EmailFormSchema>
export type SubmitNewPasswordForm = z.infer<typeof SubmitNewPasswordFormSchema>
export type SubmitNewPasswordFormSchema = z.infer<
  typeof SubmitNewPasswordFormSchema
>
export type CustomerSignUpForm = z.infer<typeof CustomerSignUpFormSchema>
