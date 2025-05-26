import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerRecoverPayload } from '@shopify/hydrogen-react/storefront-api-types'
import { EmailForm, EmailFormSchema } from '@/@types/customers'
import { Button, Input } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCustomer from '@/hooks/queries/useCustomer'
import { ROUTES } from '@/utils/constants'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { toast } = useToastContext()
  const { useSendResetPasswordEmailMutation } = useCustomer()
  const sendResetPasswordEmail = useSendResetPasswordEmailMutation(
    handleSendResetPasswordEmailSuccess
  )
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<EmailForm>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(EmailFormSchema),
  })

  function handleSendResetPasswordEmailSuccess(data: CustomerRecoverPayload) {
    if (data.customerUserErrors.length > 0) {
      toast.error({ message: data.customerUserErrors[0].message })
      return
    }

    reset({ email: '' })
    toast.success({
      message: `We've sent you an email with a link to update your password!`,
    })
  }

  const onSubmit = (data: EmailForm) =>
    sendResetPasswordEmail.mutate(data.email)

  return (
    <div className='flex w-[100dvw] flex-col items-center px-4 sm:w-128'>
      <h1 className='text-dark-green py-8 text-4xl font-semibold'>
        Reset your password
      </h1>

      <p className='text-dark-green mb-10'>
        We will send you an email to reset your password.
      </p>

      <div className='flex w-[100dvw] flex-col sm:w-96'>
        <label className='text-dark-green mb-2 font-semibold'>Email</label>
        <Input.Text {...register('email')} />
        <p className='mt-2 h-4 text-xs text-red-500'>
          {errors?.email?.message || ''}
        </p>
      </div>

      <Button.Plain
        className='my-8 self-center'
        type='submit'
        onClick={handleSubmit(onSubmit)}
        isLoading={sendResetPasswordEmail.isPending}
      >
        Submit
      </Button.Plain>

      <button
        className='text-dark-green mt-3 cursor-pointer text-center text-sm underline'
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        Go back to login
      </button>
    </div>
  )
}

export default ResetPassword
