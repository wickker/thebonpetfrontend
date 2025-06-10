import { useSearchParams } from 'react-router-dom'
import { Product } from '@shopify/hydrogen-react/storefront-api-types'
import { MeatType } from '@/utils/enums'
import useProduct from './queries/useProduct'

const useGetDisplayProduct = (animal: 'dog' | 'cat') => {
  const { useGetProductsQuery } = useProduct()
  const getProducts = useGetProductsQuery({
    first: 100,
  })
  const products = getProducts.data?.nodes || []
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('productId')

  let product: Product | undefined = products.find(
    (p) =>
      p.title.includes(MeatType.CHICKEN) &&
      p.title.toLowerCase().includes(animal) &&
      !p.title.includes('Trial') &&
      !p.title.includes('Christmas') &&
      !p.title.includes('Donation')
  )

  if (productId) {
    product = products.find((p) => p.id === productId)
  }

  return {
    product,
    isLoading: getProducts.isLoading,
  }
}

export default useGetDisplayProduct
