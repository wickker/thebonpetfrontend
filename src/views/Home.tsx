import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/commons'
import { useCartActions } from '@/store/useCartStore'

const computeConicGradient = () => {
  const stripeCount = 49
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
      <div className='relative h-fit md:p-14'>
        <div
          className='flex h-full w-full flex-col items-center bg-cover bg-bottom bg-no-repeat px-4 text-white md:rounded-xl'
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), url('/home-introduction.png')`,
          }}
        >
          <img
            src='/home-time-to-eat.png'
            alt='Time to eat'
            className='mt-14'
          />
          <h1
            className='mx-4 mt-24 mb-8 w-full text-center text-2xl leading-[1.4] text-white md:mt-54 md:w-[60%] md:text-4xl'
            style={{ textShadow: '1px 1px 5px black' }}
          >
            Our obsession with fresh pet food starts with using premium,
            globally-sourced ingredients
          </h1>
          <Button.Cta className='mb-8'>
            {/* TODO: */}
            Learn More
          </Button.Cta>
        </div>

        <div className='absolute right-0 bottom-[-134px] left-0 hidden place-items-center md:grid'>
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
          {/* TODO: */}
        </div>
      </div>
    </div>
  )
}

export default Home
