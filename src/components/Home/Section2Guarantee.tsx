import { motion } from 'motion/react'
import { FaArrowRight } from 'react-icons/fa6'
import { IoDocumentText } from 'react-icons/io5'

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

const Section2Guarantee = () => {
  return (
    <div className='relative flex h-fit flex-col items-center overflow-hidden bg-white'>
      <div className='z-badge mt-8 mb-8 grid w-full max-w-[1650px] grid-cols-[1fr] gap-4 px-4 lg:mt-50 lg:w-[90%] lg:grid-cols-[1fr_1fr_1fr]'>
        <img
          src='/badge.png'
          alt='Badge'
          className='justify-self-center lg:hidden'
        />

        <div className='flex flex-col items-center gap-4'>
          <img
            src='/home-scales.png'
            alt='Scales'
            className='h-[250px] w-[250px] rounded-xl border-[2px] border-[#E9D9BD]'
          />
          <h1 className='text-center text-2xl font-bold text-[#FFF3DF]'>
            Scientifically Balanced
          </h1>
          <p className='text-center leading-[1.8] text-[#E9D9BD]'>
            Developed by PhD nutritionists and made with love, our comprehensive
            meals <b>exceed AAFCO standards</b>, ensuring a complete and
            balanced nutrition.
          </p>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <img
            src='/home-scales.png'
            alt='Scales'
            className='h-[250px] w-[250px] rounded-xl border-[2px] border-[#E9D9BD]'
          />
          <h1 className='text-center text-2xl font-bold text-[#FFF3DF]'>
            Restaurant Grade Ingredients
          </h1>
          <p className='text-center leading-[1.8] text-[#E9D9BD]'>
            We only use carefully curated, whole food ingredients and free range
            chickens, offering quality you'd expect on your plate - crafted for
            your pet.
          </p>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <img
            src='/home-scales.png'
            alt='Scales'
            className='h-[250px] w-[250px] rounded-xl border-[2px] border-[#E9D9BD]'
          />
          <h1 className='text-center text-2xl font-bold text-[#FFF3DF]'>
            Healthier, Drool-Worthy Meals
          </h1>
          <p className='text-center leading-[1.8] text-[#E9D9BD]'>
            Made for the needs of your furkid, our{' '}
            <span className='underline'>gently cooked</span> meals provide
            better breath, better poop, a healthier weight and are always{' '}
            <b>ethically sourced</b>.
          </p>
        </div>

        <button className='group my-8 flex w-fit cursor-pointer items-center gap-x-1 justify-self-center rounded-full border-2 border-white/80 bg-white/24 px-4 py-2 text-white lg:col-start-2'>
          <IoDocumentText className='h-10 w-10' />
          <div>
            <div className='flex items-center gap-x-2 text-lg'>
              Transparency Matters
              <FaArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
            </div>
            <p className='mr-1 truncate text-sm'>
              Trace ingredients, supplements & more
            </p>
          </div>
        </button>
      </div>

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: 'linear',
        }}
        className='absolute top-[-670px] h-[1500px] w-[1500px] scale-230'
        style={{
          background: `linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(0, 0, 0, 0.24) 75%), radial-gradient(transparent 0%, var(--color-dark-green) 42%, var(--color-dark-green) 100%), conic-gradient(${computeConicGradient()})`,
        }}
      />
    </div>
  )
}

export default Section2Guarantee
