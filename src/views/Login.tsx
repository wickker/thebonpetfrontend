import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { CustomerLoginForm, CustomerLoginFormSchema } from '@/@types/customers'
import { Button, Input } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCart from '@/hooks/queries/useCart'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'
import { getCartJsonFromLocalStorage } from '@/utils/functions'

const defaultFormValues: CustomerLoginForm = {
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
  const { useUpdateCartBuyerIdentityMutation } = useCart()
  const updateCartBuyerIdentity = useUpdateCartBuyerIdentityMutation(
    handleUpdateCartBuyerIdentitySuccess
  )
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CustomerLoginForm>({
    defaultValues: defaultFormValues,
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
      const cart = getCartJsonFromLocalStorage()
      if (cart) {
        updateCartBuyerIdentity.mutate({
          cartId: cart.cartId,
          buyerIdentity: {
            customerAccessToken: data.customerAccessToken.accessToken,
          },
        })
        return
      }

      reset(defaultFormValues)
      navigate(ROUTES.HOME)
    }
  }

  function handleUpdateCartBuyerIdentitySuccess(
    data: CartBuyerIdentityUpdatePayload
  ) {
    if (data.userErrors && data.userErrors.length > 0) {
      toast.error({
        message: data.userErrors[0].message,
        title: 'Update cart buyer identity failed',
      })
      return
    }

    reset(defaultFormValues)
    navigate(ROUTES.HOME)
  }

  const onSubmit = (data: CustomerLoginForm) => createToken.mutate(data)

  return (
    <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-96'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-semibold'>
          Login
        </h1>

        <form>
          <label className='text-dark-green mb-2 font-semibold'>Email</label>
          <Input.Text {...register('email')} />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.email?.message || ''}
          </p>
          <div className='mb-6' />

          <label className='text-dark-green mb-2 font-semibold'>Password</label>
          <Input.Password {...register('password')} />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.password?.message || ''}
          </p>
        </form>

        <Button.Plain
          className='my-8 self-center'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          isLoading={createToken.isPending || updateCartBuyerIdentity.isPending}
        >
          Login
        </Button.Plain>

        <button
          className='text-dark-green mt-3 text-center text-sm underline hover:cursor-pointer'
          onClick={() => navigate(ROUTES.RESET_PASSWORD)}
        >
          Forgot your password?
        </button>

        <p className='text-dark-gray mt-3 text-center text-sm'>
          Don't have an account?{' '}
          <a className='text-dark-green underline hover:cursor-pointer'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
