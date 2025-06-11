const ProductSkeleton = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        {/* Product Section */}
        <div className='grid w-full gap-6 lg:grid-cols-[3fr_1.6fr]'>
          <div className='order-2 flex flex-col gap-y-4 lg:order-1'>
            {/* Animal Icon + Text */}
            <div className='flex items-center gap-x-2'>
              <div className='h-8 w-8 animate-pulse rounded-full bg-neutral-300' />
              <div className='h-6 w-[180px] animate-pulse rounded-full bg-neutral-300' />
            </div>

            {/* Title */}
            <div className='mb-4 h-12 w-[200px] animate-pulse rounded-full bg-neutral-300' />

            {/* Description */}
            <div className='mb-4 flex flex-col gap-2'>
              <div className='h-4 w-full animate-pulse rounded-full bg-neutral-300' />
              <div className='h-4 w-full animate-pulse rounded-full bg-neutral-300' />
              <div className='h-4 w-3/4 animate-pulse rounded-full bg-neutral-300' />
            </div>

            {/* Radio Options */}
            <div className='mb-4 flex flex-wrap items-start gap-x-4 gap-y-2'>
              <div className='flex items-center gap-x-2'>
                <div className='h-4 w-4 animate-pulse rounded-full bg-neutral-300' />
                <div className='h-6 w-[140px] animate-pulse rounded-full bg-neutral-300' />
              </div>
              <div className='flex items-center gap-x-2'>
                <div className='h-4 w-4 animate-pulse rounded-full bg-neutral-300' />
                <div className='h-6 w-[180px] animate-pulse rounded-full bg-neutral-300' />
              </div>
            </div>

            {/* Quantity and Price */}
            <div className='flex flex-wrap items-center gap-4'>
              <div className='h-12 w-[120px] animate-pulse rounded-xl bg-neutral-300' />
              <div className='h-8 w-[150px] animate-pulse rounded-full bg-neutral-300' />
            </div>

            {/* Add to Cart Button */}
            <div className='mt-4 h-12 w-full animate-pulse rounded-xl bg-neutral-300' />
          </div>

          <div className='order-1 flex flex-col gap-4 lg:order-2'>
            {/* Main Product Image */}
            <div className='aspect-square w-full rounded-xl border border-[#CCBC9E] bg-[#F4ECD3] p-4 lg:h-[400px] lg:w-[450px]'>
              <div className='h-full w-full animate-pulse rounded-xl bg-neutral-300' />
            </div>

            {/* Small Product Images */}
            <div className='order-1 flex w-full items-center justify-between gap-x-4'>
              <div className='aspect-square w-1/3 rounded-xl border border-[#CCBC9E] bg-[#F4ECD3] p-4'>
                <div className='h-full w-full animate-pulse rounded-xl bg-neutral-300' />
              </div>
              <div className='aspect-square w-1/3 rounded-xl border border-[#CCBC9E] bg-[#F4ECD3] p-4'>
                <div className='h-full w-full animate-pulse rounded-xl bg-neutral-300' />
              </div>
              <div className='aspect-square w-1/3 rounded-xl border border-[#CCBC9E] bg-[#F4ECD3] p-4'>
                <div className='h-full w-full animate-pulse rounded-xl bg-neutral-300' />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className='flex w-full flex-col'>
          {/* Section Title */}
          <div className='my-8 flex items-center gap-2'>
            <div className='h-8 w-[220px] animate-pulse rounded-full bg-neutral-300 whitespace-nowrap' />
            <div className='hidden h-[2px] w-full rounded-full bg-[#CCBC9E] lg:block' />
          </div>

          <div className='grid w-full gap-8 lg:grid-cols-[3fr_1.6fr]'>
            {/* Left Column - Details */}
            <div className='flex flex-col'>
              {/* Product Details Text */}
              <div className='mb-4 flex flex-col gap-2'>
                <div className='h-4 w-full animate-pulse rounded-full bg-neutral-300' />
                <div className='h-4 w-full animate-pulse rounded-full bg-neutral-300' />
                <div className='h-4 w-3/4 animate-pulse rounded-full bg-neutral-300' />
                <div className='h-4 w-5/6 animate-pulse rounded-full bg-neutral-300' />
              </div>

              <div className='mt-4 h-[1px] w-full bg-[#CCBC9E]' />

              {/* Accordions */}
              {[1, 2, 3].map((i) => (
                <div key={i} className='border-b border-[#CCBC9E] py-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2'>
                      <div className='h-6 w-6 animate-pulse rounded-full bg-neutral-300' />
                      <div className='h-6 w-[120px] animate-pulse rounded-full bg-neutral-300' />
                    </div>
                    <div className='h-6 w-6 animate-pulse rounded-full bg-neutral-300' />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Suggested Product */}
            <div className='flex flex-col items-center'>
              <div className='mb-6 h-8 w-[200px] animate-pulse rounded-full bg-neutral-300' />

              <div className='flex aspect-square w-10/12 flex-col items-center justify-between rounded-xl border border-[#CCBC9E] bg-[#FBEED1] p-4 lg:h-[300px] lg:w-[300px]'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='h-4 w-[150px] animate-pulse rounded-full bg-neutral-300' />
                  <div className='h-6 w-[180px] animate-pulse rounded-full bg-neutral-300' />
                </div>
                <div className='h-[150px] w-[150px] animate-pulse rounded-xl bg-neutral-300' />
                <div className='h-6 w-[80px] animate-pulse rounded-full bg-neutral-300' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
