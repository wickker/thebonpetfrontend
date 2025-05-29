import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCartActions } from '@/store/useCartStore'

const Home = () => {
  const { openCart } = useCartActions()
  const [searchParams, setSearchParams] = useSearchParams()

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
