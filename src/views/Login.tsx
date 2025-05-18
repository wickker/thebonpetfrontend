import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { CustomerLoginForm, CustomerLoginFormSchema } from '@/@types/customers'

const defaultFormValues: CustomerLoginForm = {
  email: '',
  password: '',
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
    // reset,
  } = useForm<CustomerLoginForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(CustomerLoginFormSchema),
  })

  const onSubmit = (data: CustomerLoginForm) => {
    console.log('data : ', data)
  }

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
          <div className='mb-6' />
        </form>

        <a className='text-dark-green block text-sm underline hover:cursor-pointer'>
          Forgot your password?
        </a>

        <button
          className='bg-dark-green my-10 w-fit self-center px-8 py-2 text-white hover:cursor-pointer'
          type='submit'
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>

        <p className='text-dark-gray text-center text-sm'>
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
