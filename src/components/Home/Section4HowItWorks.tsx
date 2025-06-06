import { LINKS } from '@/utils/constants'

const Section4HowItWorks = () => {
  const arrow = (
    <img
      src='/home-how-arrow.png'
      alt='How it works arrow'
      className='mt-[80px] hidden scale-180 lg:block xl:scale-240'
    />
  )

  return (
    <div
      className='text-dark-green bg-top-left mx-auto flex w-full max-w-[1650px] flex-col items-center bg-contain bg-no-repeat px-4 py-10 lg:w-[90%]'
      style={{
        backgroundImage: `url('/home-how-paw-prints.png')`,
      }}
    >
      <h1 className='text-center text-5xl font-bold'>How it works</h1>

      <p className='mt-4 mb-6 text-center text-lg leading-[1.8]'>
        Our paws ensure you get the best. Every step of the way.
      </p>

      <div className='grid grid-cols-[1fr] gap-4 lg:grid-cols-[1fr_50px_1fr_50px_1fr_50px_1fr]'>
        <div className='flex flex-col items-center'>
          <img
            src='/home-how-1.png'
            alt='How it works 1'
            className='aspect-square h-[200px] w-[200px] object-cover'
          />
          <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
            1
          </div>
          <h1 className='mt-3 mb-2 text-center text-2xl font-bold'>
            Choose Your Pet's Meals
          </h1>
          <p className='text-center leading-[1.8]'>
            Select a meal that works best for your Furkid. Recieve a free sample
            pack to make sure your furry friend loves it.
          </p>
        </div>

        {arrow}

        <div className='flex flex-col items-center'>
          <img
            src='/home-how-2.png'
            alt='How it works 2'
            className='aspect-square h-[200px] w-[200px] object-cover'
          />
          <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
            2
          </div>
          <h1 className='mt-3 mb-2 text-center text-2xl font-bold'>
            Meals Are Made To Order
          </h1>
          <p className='text-center leading-[1.8]'>
            Slow-cooked meals are made with love here in Singapore. Meals are
            frozen to ensure freshness and flavour.
          </p>
        </div>

        {arrow}

        <div className='flex flex-col items-center'>
          <img
            src='/home-how-3.png'
            alt='How it works 3'
            className='aspect-square h-[200px] w-[200px] translate-y-6 object-cover'
          />
          <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
            3
          </div>
          <h1 className='mt-3 mb-2 text-center text-2xl font-bold'>
            Receive Your Meals
          </h1>
          <p className='text-center leading-[1.8]'>
            Meals stay frozen until they reach your doorstep with{' '}
            <a className='underline' href={LINKS.NINJA_COLD} target='_blank'>
              cold-chain delivery
            </a>
            . You can also pick up for free.
          </p>
        </div>

        {arrow}

        <div className='flex flex-col items-center'>
          <img
            src='/home-how-4.png'
            alt='How it works 4'
            className='aspect-square h-[200px] w-[200px] translate-y-4 object-cover'
          />
          <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
            4
          </div>
          <h1 className='mt-3 mb-2 text-center text-2xl font-bold'>
            Defrost And Dig In
          </h1>
          <p className='text-center leading-[1.8]'>
            No portioning or hard work - simply defrost, serve and watch that
            tail wiggle!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Section4HowItWorks
