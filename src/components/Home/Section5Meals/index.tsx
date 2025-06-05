import { useState } from 'react'
import useProduct from '@/hooks/queries/useProduct'
import CalculatorTile from './CalculatorTile'
import DonationTile from './DonationTile'
import StandardProductTile from './StandardProductTile'
import Tabs from './Tabs'
import TrialPack from './TrialPack'
import { Tab } from './utils'

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
  const standardProducts = products.filter(
    (product) =>
      !product.title.includes('Trial') &&
      !product.title.includes('Christmas') &&
      !product.title.includes('Donation') &&
      product.title.toLowerCase().includes(selectedTab)
  )

  const renderStandardProducts = () => {
    if (getProducts.isFetching) {
      return Array.from({ length: 3 }).map((_, index) => (
        <StandardProductTile.Skeleton key={index} />
      ))
    }

    return standardProducts.map((p) => (
      <StandardProductTile
        key={p.id}
        productTitle={p.title}
        unitPrice={p.variants.edges[0].node.price.amount}
        variantId={p.variants.edges[0].node.id}
        imageUrl={p.featuredImage?.url || ''}
      />
    ))
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        <p className='text-lg font-bold tracking-wider text-[#443928] uppercase'>
          Our Meals Are
        </p>

        <h1 className='mt-4 mb-8 text-center text-5xl font-bold text-[#443928]'>
          A Different Breed
        </h1>

        <div className='mb-6 grid w-full grid-cols-[1fr_1fr] items-center text-[#443928] lg:w-[30%] lg:max-w-[380px]'>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>

        <div className='grid gap-6 lg:grid-cols-[5fr_1.2fr]'>
          {getProducts.isFetching ? (
            <TrialPack.Skeleton />
          ) : (
            <TrialPack
              products={trialPackProducts}
              packWeight={selectedTab === Tab.DOGS ? '300g' : '200g'}
            />
          )}

          <CalculatorTile />
        </div>

        <h1 className='my-8 text-center text-[40px] font-bold text-[#443928]'>
          Complete & Balanced Superfoods
        </h1>

        <div className='mb-6 flex w-full flex-wrap items-center justify-around gap-6'>
          {renderStandardProducts()}
        </div>

        <DonationTile />
      </div>
    </div>
  )
}

export default Section5Meals
