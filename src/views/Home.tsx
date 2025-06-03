import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Section1Hero,
  Section2Guarantee,
  Section3Guide,
} from '@/components/Home'
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

  return (
    <div className='flex w-full flex-col'>
      <Section1Hero />

      <Section2Guarantee />

      <Section3Guide />
    </div>
  )
}

export default Home
