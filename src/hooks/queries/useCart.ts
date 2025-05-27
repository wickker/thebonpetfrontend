import {
  CartAttributesUpdatePayload,
  CartBuyerIdentityUpdatePayload,
  CartNoteUpdatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
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

  const useUpdateCartBuyerIdentityMutation = (
    onSuccess?: (data: CartBuyerIdentityUpdatePayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.updateCartBuyerIdentity,
      retry: false,
      onSuccess,
    })

  const useUpdateCartNoteAndAttributesMutation = (
    onSuccess: (
      data: Array<CartNoteUpdatePayload | CartAttributesUpdatePayload>
    ) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.updateCartNoteAndAttributes,
      retry: false,
      onSuccess,
    })

  return {
    useGetCartQuery,
    useUpdateCartBuyerIdentityMutation,
    useUpdateCartNoteAndAttributesMutation,
  }
}

export default useCart
