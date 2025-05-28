import { CartLinesUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UpdateCartNoteBuyerIdentityAndAttributesResponse } from '@/@types/carts'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'
import { QUERY_KEYS } from '@/utils/queryKeys'

const useCart = () => {
  const useGetCartQuery = (cartId?: string) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CART(cartId),
      queryFn: () => shopifyStorefrontApi.getCart(cartId || ''),
      enabled: !!cartId,
      retry: false,
    })

  const useUpdateCartNoteBuyerIdentityAndAttributesMutation = (
    onSuccess: (data: UpdateCartNoteBuyerIdentityAndAttributesResponse) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.updateCartNoteBuyerIdentityAndAttributes,
      retry: false,
      onSuccess,
    })

  const useUpdateCartQuantityMutation = (
    onSuccess: (data: CartLinesUpdatePayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.updateCartQuantity,
      retry: false,
      onSuccess,
    })

  return {
    useGetCartQuery,
    useUpdateCartNoteBuyerIdentityAndAttributesMutation,
    useUpdateCartQuantityMutation,
  }
}

export default useCart
