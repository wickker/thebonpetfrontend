import { useState } from 'react'
import useProduct from '@/hooks/queries/useProduct'
import useAddItemToCart, { AddToCartButton } from '@/hooks/useAddItemToCart'
import CalculatorTile from './CalculatorTile'
import Tabs from './Tabs'
import TrialPack from './TrialPack'
import { Tab } from './utils'

const Section5Meals = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.DOGS)
  const { addItemToCart, addToCartButtonRef, isLoading } = useAddItemToCart()
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

        <div className='mb-6 grid w-full grid-cols-[1fr_1fr] items-center text-[#443928] lg:w-[30%] lg:max-w-[380px]'>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>

        <div className='grid gap-6 lg:grid-cols-[5fr_1fr]'>
          {getProducts.isFetching ? (
            <TrialPack.Skeleton />
          ) : (
            <TrialPack
              products={trialPackProducts}
              packWeight={selectedTab === Tab.DOGS ? '300g' : '200g'}
              onAddToCart={addItemToCart}
              isLoading={
                addToCartButtonRef.current === AddToCartButton.TRIAL_PACK &&
                isLoading
              }
            />
          )}

          <CalculatorTile />
        </div>

        {/* TODO: */}
      </div>
    </div>
  )
}

export default Section5Meals
