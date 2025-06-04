import { Button } from '@/components/commons'

const Section1Hero = () => {
  return (
    <div className='relative h-fit lg:p-14'>
      <div
        className='flex h-full w-full flex-col items-center bg-cover bg-bottom bg-no-repeat px-4 text-white lg:rounded-xl'
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), url('/home-hero.png')`,
        }}
      >
        <img src='/home-tagline.png' alt='Time to eat' className='mt-14' />

        <h1
          className='mx-4 mt-24 mb-8 w-full text-center text-2xl leading-[1.4] text-white lg:mt-54 lg:w-[60%] lg:text-4xl'
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

      <div className='absolute right-0 bottom-[-134px] left-0 hidden place-items-center lg:grid'>
        <img src='/badge.png' alt='Badge' className='z-1' />
      </div>
    </div>
  )
}

export default Section1Hero
