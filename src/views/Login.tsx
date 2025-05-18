import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerAccessTokenCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { CustomerLoginForm, CustomerLoginFormSchema } from '@/@types/customers'
import { ButtonPlain } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'

const defaultFormValues: CustomerLoginForm = {
  email: '',
  password: '',
} as const

const Login = () => {
  const { toast } = useToastContext()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
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
      reset(defaultFormValues)
      navigate(ROUTES.HOME)
    }
  }

  const onSubmit = (data: CustomerLoginForm) => createToken.mutate(data)

  const toggleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-96'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-semibold'>
          Login
        </h1>

        <form>
          <label className='text-dark-green mb-2 font-semibold'>Email</label>
          <input
            type='text'
            className='text-dark-gray focus:border-dark-green block h-[45px] w-full border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]'
            {...register('email')}
          />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.email?.message || ''}
          </p>
          <div className='mb-6' />

          <label className='text-dark-green mb-2 font-semibold'>Password</label>
          <div className='text-dark-gray focus:border-dark-green flex h-[45px] w-full items-center gap-x-2 border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]'>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className='h-full w-full outline-none'
            />
            <button
              className='hover:cursor-pointer'
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaRegEyeSlash className='text-dark-green h-6 w-6' />
              ) : (
                <FaRegEye className='text-dark-green h-6 w-6' />
              )}
            </button>
          </div>
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.password?.message || ''}
          </p>
        </form>

        <ButtonPlain
          className='my-8 self-center'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          isLoading={createToken.isPending}
        >
          Login
        </ButtonPlain>

        <a className='text-dark-green mt-3 text-center text-sm underline hover:cursor-pointer'>
          Forgot your password?
        </a>

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
