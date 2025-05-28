import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useCustomer from '@/hooks/queries/useCustomer'
import { useCartActions } from '@/store/useCartStore'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const Home = () => {
  const { openCart } = useCartActions()
  const [searchParams, setSearchParams] = useSearchParams()
  const token = getTokenJsonFromLocalStorage()
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery(token?.accessToken || '', {
    first: 100,
  })

  console.log('Customer : ', getCustomer.data)

  useEffect(() => {
    if (searchParams.get('cart')) {
      openCart()
      setSearchParams({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'></div>
}

export default Home
