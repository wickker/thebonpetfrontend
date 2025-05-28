import useCustomer from '@/hooks/queries/useCustomer'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const Home = () => {
  const token = getTokenJsonFromLocalStorage()
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery(token?.accessToken || '', {
    first: 100,
  })

  console.log('Customer : ', getCustomer.data)

  return <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'></div>
}

export default Home
