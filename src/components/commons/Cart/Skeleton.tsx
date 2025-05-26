const TileSkeleton = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-3'>
      <div className='h-18 w-18 animate-pulse rounded bg-neutral-300' />

      <div className='flex flex-col gap-y-3'>
        <div className='text-dark-green flex items-start justify-between gap-x-2 font-bold'>
          <div className='h-4 w-[70%] animate-pulse rounded-full bg-neutral-300' />
          <div className='h-4 w-[25%] animate-pulse rounded-full bg-neutral-300' />
        </div>

        <div className='flex items-center justify-between gap-x-2'>
          <div className='h-4 w-[60%] animate-pulse rounded-full bg-neutral-300' />
          <div className='h-4 w-[10%] animate-pulse rounded-full bg-neutral-300' />
        </div>

        <div className='flex items-center justify-between'>
          <div className='h-4 w-[20%] animate-pulse rounded-full bg-neutral-300' />
          <div className='h-4 w-[35%] animate-pulse rounded-full bg-neutral-300' />
        </div>
      </div>
    </div>
  )
}

const Skeleton = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <>
      <TileSkeleton key={index} />
      <div className='my-4 flex h-[1px] w-full shrink-0 animate-pulse rounded-full bg-neutral-300' />
    </>
  ))
}

export default Skeleton
