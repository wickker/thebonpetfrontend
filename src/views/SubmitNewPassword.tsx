import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerResetByUrlPayload } from '@shopify/hydrogen-react/storefront-api-types'
import {
  SubmitNewPasswordForm,
  SubmitNewPasswordFormSchema,
} from '@/@types/customers'
import { Button, Input } from '@/components/commons'
import Config from '@/configs'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'

const defaultValues: SubmitNewPasswordForm = {
  password: '',
  confirmPassword: '',
} as const

const SubmitNewPassword = () => {
  const navigate = useNavigate()
  const { toast } = useToastContext()
  const { useCustomerResetByUrlMutation } = useCustomer()
  const submitNewPassword = useCustomerResetByUrlMutation(
    handleSubmitNewPasswordSuccess
  )
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SubmitNewPasswordForm>({
    defaultValues,
    resolver: zodResolver(SubmitNewPasswordFormSchema),
  })

  function handleSubmitNewPasswordSuccess(data: CustomerResetByUrlPayload) {
    if (data.customerUserErrors.length > 0) {
      toast.error({ message: data.customerUserErrors[0].message })
      return
    }

    if (data.customerAccessToken) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        JSON.stringify(data.customerAccessToken)
      )
      reset(defaultValues)
      navigate(ROUTES.HOME)
    }
  }
  const onSubmit = (data: SubmitNewPasswordForm) => {
    // TODO: Check this
    const url = window.location.href.replace(
      Config.VITE_FE_BASE_URL,
      Config.VITE_SHOPIFY_SHOP_URL
    )
    submitNewPassword.mutate({
      password: data.password,
      resetUrl: url,
    })
  }

  return (
    <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col items-center px-4 sm:w-128'>
        <h1 className='text-dark-green py-8 text-4xl font-bold'>
          Reset your password
        </h1>

        <p className='text-dark-green mb-10'>Enter a new password.</p>

        <div className='flex w-[100dvw] flex-col sm:w-96'>
          <label className='text-dark-green mb-2 font-bold'>Password</label>
          <Input.Password {...register('password')} />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.password?.message || ''}
          </p>

          <label className='text-dark-green mb-2 font-bold'>
            Confirm password
          </label>
          <Input.Password {...register('confirmPassword')} />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.confirmPassword?.message || ''}
          </p>
        </div>

        <Button.Plain
          className='my-8 self-center'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          isLoading={submitNewPassword.isPending}
        >
          Reset password
        </Button.Plain>
      </div>
    </div>
  )
}

export default SubmitNewPassword
