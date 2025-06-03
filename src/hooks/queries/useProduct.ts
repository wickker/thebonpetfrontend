import { QueryRootProductsArgs } from '@shopify/hydrogen-react/storefront-api-types'
import { useQuery } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'
import { QUERY_KEYS } from '@/utils/queryKeys'

const useProduct = () => {
  const useGetProductsQuery = (request: QueryRootProductsArgs) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_PRODUCTS,
      retry: false,
      queryFn: () => shopifyStorefrontApi.getProducts(request),
    })

  return {
    useGetProductsQuery,
  }
}

export default useProduct
