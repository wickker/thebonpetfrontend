import {
  CartCreatePayload,
  CartLinesAddPayload,
  CartLinesUpdatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UpdateCartNoteBuyerIdentityAndAttributesResponse } from '@/@types/carts'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'
import { useLocalStorageCartJson } from '@/store/useLocalStorageCartStore'
import { QUERY_KEYS } from '@/utils/queryKeys'

const useCart = () => {
  const useGetCartQuery = () => {
    const cart = useLocalStorageCartJson()
    return useQuery({
      queryKey: QUERY_KEYS.GET_CART(cart?.cartId),
      queryFn: () => shopifyStorefrontApi.getCart(cart?.cartId || ''),
      enabled: !!cart?.cartId,
      retry: false,
    })
  }

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

  const useCreateCartMutation = (
    onSuccess: (data: CartCreatePayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.createCart,
      retry: false,
      onSuccess,
    })

  const useAddItemToCartMutation = (
    onSuccess: (data: CartLinesAddPayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.addItemToCart,
      retry: false,
      onSuccess,
    })

  return {
    useGetCartQuery,
    useUpdateCartNoteBuyerIdentityAndAttributesMutation,
    useUpdateCartQuantityMutation,
    useCreateCartMutation,
    useAddItemToCartMutation,
  }
}

export default useCart
