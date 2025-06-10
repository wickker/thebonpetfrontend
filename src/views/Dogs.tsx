import { ProductPage } from '@/components/Product'
import useGetDisplayProduct from '@/hooks/useGetDisplayProduct'

const animal = 'dog'

const Dogs = () => {
  const { product, isLoading, suggestedProduct } = useGetDisplayProduct(animal)

  if (isLoading) return <div>Loading...</div>

  if (!product || !suggestedProduct) return null

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        <ProductPage
          animal={animal}
          product={product}
          suggestedProduct={suggestedProduct}
        />
      </div>
    </div>
  )
}

export default Dogs
