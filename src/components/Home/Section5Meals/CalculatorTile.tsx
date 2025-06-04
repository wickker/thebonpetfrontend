const CalculatorTile = () => {
  return (
    <div
      className='flex h-full w-[240px] flex-col items-center justify-center justify-self-center rounded-xl border-[2px] border-black/10 px-4 py-6 lg:w-full'
      style={{
        background:
          'linear-gradient(151.06deg, #4EC465 23.09%, #3CA250 92.96%),linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08))',
      }}
    >
      <p className='mb-1 text-center text-sm font-bold tracking-widest text-[#FFF3DF] uppercase'>
        Try Our
      </p>
      <h1 className='mb-2 text-center text-3xl font-bold text-[#FFF3DF]'>
        Pet Food Calculator
      </h1>
      <img
        src='/home-meals-calculator.png'
        alt='Pet meals calculator'
        className='w-[54%]'
      />
      <button className='text-green mt-4 cursor-pointer rounded-xl border-[2px] border-[#E9D9BD] bg-[#FFF3DF] px-3 py-2 text-lg font-bold tracking-widest uppercase'>
        Try It Now
      </button>
    </div>
  )
}

export default CalculatorTile
