const Section7Faqs = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        <div className='grid w-full gap-6 lg:grid-cols-[3fr_auto_1.6fr]'>
          <div className='flex flex-col'>
            <h1 className='text-dark-brown mt-4 mb-8 text-left text-5xl font-bold'>
              Frequently Asked Questions
            </h1>
          </div>

          <div className='w-[2px] rounded-full bg-[#E9D9BD]' />
        </div>
      </div>
    </div>
  )
}

export default Section7Faqs
