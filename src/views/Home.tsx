import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCartActions } from '@/store/useCartStore'

const computeConicGradient = () => {
  const stripeCount = 50
  const segmentAngle = 360 / stripeCount
  return Array.from({ length: stripeCount }, (_, i) => {
    const start = i * segmentAngle
    const end = start + segmentAngle
    const color = i % 2 === 0 ? '#1B6058' : '#1B6058E6'
    return `${color} ${start}deg ${end}deg`
  }).join(', ')
}

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
      {/* Section 1: Introduction */}
      <div className='relative h-[728px] p-14'>
        <div className='h-full w-full rounded-lg bg-amber-300'></div>

        <div className='absolute right-0 bottom-[-134px] left-0 grid place-items-center'>
          <img src='/badge.png' alt='Badge' className='z-1' />
        </div>
      </div>

      <div className='relative h-[728px] overflow-hidden bg-white'>
        <div
          className='h-[1300px] w-full translate-y-[-46%] scale-200'
          style={{
            background: `linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(0, 0, 0, 0.24) 75%), radial-gradient(transparent 0%, var(--color-dark-green) 42%, var(--color-dark-green) 100%), conic-gradient(${computeConicGradient()})`,
          }}
        />
        <div className='absolute top-0 flex h-full w-full flex-col items-center justify-center text-white'>
          Hello
        </div>
      </div>
    </div>
  )
}

export default Home
