import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import {
  CustomerSignUpForm,
  CustomerSignUpFormSchema,
} from '@/@types/customers'
import { Button, Input } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCustomer from '@/hooks/queries/useCustomer'
import { ROUTES } from '@/utils/constants'

const defaultValues: CustomerSignUpForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
} as const

const SignUp = () => {
  const { toast } = useToastContext()
  const navigate = useNavigate()
  const { useCreateCustomerMutation } = useCustomer()
  const createCustomer = useCreateCustomerMutation(handleCreateCustomerSuccess)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CustomerSignUpForm>({
    defaultValues,
    resolver: zodResolver(CustomerSignUpFormSchema),
  })

  function handleCreateCustomerSuccess(data: CustomerCreatePayload) {
    if (data.customerUserErrors.length > 0) {
      toast.error({ message: data.customerUserErrors[0].message })
      return
    }

    reset(defaultValues)
    navigate(ROUTES.LOGIN)
  }

  const onSubmit = (data: CustomerSignUpForm) => {
    const request = {
      ...data,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
    }
    createCustomer.mutate(request)
  }

  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-96'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
          Create account
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
          <div className='mb-6' />

          <div className='mb-1 flex items-center justify-between'>
            <label className='text-dark-green font-bold'>First name</label>
            <p className='text-xs text-gray-500'>Optional</p>
          </div>
          <Input.Text {...register('firstName')} />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.firstName?.message || ''}
          </p>
          <div className='mb-6' />

          <div className='mb-1 flex items-center justify-between'>
            <label className='text-dark-green font-bold'>Last name</label>
            <p className='text-xs text-gray-500'>Optional</p>
          </div>
          <Input.Text {...register('lastName')} />
          <p className='mt-2 h-4 text-xs text-red-500'>
            {errors?.lastName?.message || ''}
          </p>
        </form>

        <Button.Plain
          className='my-8 self-center'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          isLoading={createCustomer.isPending}
        >
          Create
        </Button.Plain>
      </div>
    </div>
  )
}

export default SignUp
