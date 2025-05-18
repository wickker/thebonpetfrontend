import { useQuery } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'

const useCart = () => {
  const useGetCartQuery = (cartId?: string) =>
    useQuery({
      queryKey: ['cart', cartId],
      queryFn: () => shopifyStorefrontApi.getCart(cartId || ''),
      enabled: !!cartId,
      retry: false,
    })

  return {
    useGetCartQuery,
  }
}

export default useCart
