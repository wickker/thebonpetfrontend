const ArticleSkeleton = () => {
  return (
    <div className='bg-beige relative flex h-fit flex-col gap-4 rounded-xl border border-[#CCBC9E] p-4'>
      <div className='aspect-video max-h-[300px] w-full animate-pulse rounded-xl bg-neutral-300' />

      <div className='h-[32px] w-[70%] animate-pulse rounded-full bg-neutral-300' />

      <div className='flex flex-col gap-2'>
        <div className='h-[16px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[16px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[16px] w-[80%] animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[16px] w-[60%] animate-pulse rounded-full bg-neutral-300' />
      </div>
    </div>
  )
}

export default ArticleSkeleton
