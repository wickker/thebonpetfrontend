import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerAccessTokenCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { CustomerLoginForm, CustomerLoginFormSchema } from '@/@types/customers'
import { Button, Input } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'

const defaultValues: CustomerLoginForm = {
  email: '',
  password: '',
} as const

const Login = () => {
  const { toast } = useToastContext()
  const navigate = useNavigate()
  const { useCreateCustomerAccessTokenMutation } = useCustomer()
  const createToken = useCreateCustomerAccessTokenMutation(
    handleCreateTokenSuccess
  )
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CustomerLoginForm>({
    defaultValues,
    resolver: zodResolver(CustomerLoginFormSchema),
  })

  function handleCreateTokenSuccess(data: CustomerAccessTokenCreatePayload) {
    const errors = data.customerUserErrors
    if (errors && errors.length > 0) {
      toast.error({ message: errors[0].message, title: 'Login Failed' })
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

  const onSubmit = (data: CustomerLoginForm) => createToken.mutate(data)

  return (
    <div className='flex w-[100dvw] flex-col px-4 sm:w-96'>
      <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
        Login
      </h1>

      <form>
        <label className='text-dark-green mb-2 font-bold'>Email</label>
        <Input.Text {...register('email')} />
        <p className='mt-2 h-4 text-xs text-red-500'>
          {errors?.email?.message || ''}
        </p>
        <div className='mb-6' />

        <label className='text-dark-green mb-2 font-bold'>Password</label>
        <Input.Password {...register('password')} />
        <p className='mt-2 h-4 text-xs text-red-500'>
          {errors?.password?.message || ''}
        </p>
      </form>

      <Button.Plain
        className='my-8 self-center'
        type='submit'
        onClick={handleSubmit(onSubmit)}
        isLoading={createToken.isPending}
      >
        Login
      </Button.Plain>

      <button
        className='text-dark-green mt-3 cursor-pointer text-center text-sm underline'
        onClick={() => navigate(ROUTES.RESET_PASSWORD)}
      >
        Forgot your password?
      </button>

      <p className='text-dark-gray mt-3 mb-8 text-center text-sm'>
        Don't have an account?{' '}
        <button
          className='text-dark-green cursor-pointer underline'
          onClick={() => navigate(ROUTES.SIGNUP)}
        >
          Sign up
        </button>
      </p>
    </div>
  )
}

export default Login
