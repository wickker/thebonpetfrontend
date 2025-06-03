import { useState } from 'react'
import useProduct from '@/hooks/queries/useProduct'
import { cn } from '@/utils/functions'
import TrialPack from './TrialPack'
import { Tab, TABS } from './utils'

const Section5Meals = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.DOGS)
  const { useGetProductsQuery } = useProduct()
  const getProducts = useGetProductsQuery({
    first: 100,
  })
  const products = getProducts.data?.nodes || []
  const trialPackProducts = products.filter(
    (product) =>
      product.title.includes('Trial') &&
      product.title.toLowerCase().includes(selectedTab)
  )
  // console.log('products : ', products)

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full flex-col items-center px-4 py-8 lg:w-[90%]'>
        <p className='text-lg font-bold tracking-wider text-[#443928] uppercase'>
          Our Meals Are
        </p>

        <h1 className='mt-4 mb-8 text-center text-5xl font-bold text-[#443928]'>
          A Different Breed
        </h1>

        <div className='mb-4 grid w-full grid-cols-[1fr_1fr] items-center text-[#443928] lg:w-[30%] lg:max-w-[380px]'>
          {TABS.map((tab) => {
            const isSelected = tab.tab === selectedTab

            return (
              <button
                className='flex cursor-pointer flex-col items-center gap-y-2 text-2xl font-bold'
                onClick={() => setSelectedTab(tab.tab)}
                key={tab.tab}
              >
                <p
                  className={cn(
                    'flex items-center gap-x-2 transition-colors',
                    !isSelected && 'text-[#7B6D57]'
                  )}
                >
                  <img
                    src={tab.icon}
                    alt={`${tab.label} icon`}
                    className='h-8 w-8'
                  />
                  {tab.label}
                </p>
                <div
                  className={cn(
                    'h-[2px] w-full max-w-0 rounded-full transition-all',
                    isSelected && 'max-w-full bg-[#7B6D57]'
                  )}
                />
              </button>
            )
          })}
        </div>

        <div className='grid lg:grid-cols-[5fr_1fr]'>
          <TrialPack
            products={trialPackProducts}
            packWeight={selectedTab === Tab.DOGS ? '300g' : '200g'}
          />
        </div>
      </div>
    </div>
  )
}

export default Section5Meals
