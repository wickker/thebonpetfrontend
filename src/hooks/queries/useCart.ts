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

  return {
    useGetCartQuery,
    useUpdateCartNoteBuyerIdentityAndAttributesMutation,
  }
}

export default useCart
