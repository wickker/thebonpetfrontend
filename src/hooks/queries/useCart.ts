import { CartBuyerIdentityUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'

const useCart = () => {
  const useGetCartQuery = (cartId?: string) =>
    useQuery({
      queryKey: ['carts', cartId],
      queryFn: () => shopifyStorefrontApi.getCart(cartId || ''),
      enabled: !!cartId,
      retry: false,
    })

  const useUpdateCartBuyerIdentityMutation = (
    onSuccess?: (data: CartBuyerIdentityUpdatePayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.updateCartBuyerIdentity,
      retry: false,
      onSuccess,
    })

  return {
    useGetCartQuery,
    useUpdateCartBuyerIdentityMutation,
  }
}

export default useCart
