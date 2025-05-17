import { useMutation } from '@tanstack/react-query'
import { ShopifyAccessTokenResponse } from '@/@types/shopifyCustomerAuth'
import shopifyCustomerAuthApi from '@/services/api/shopifyCustomerAuthApi'

const useShopifyCustomerAuth = () => {
  const useGetAccessTokenMutation = (
    onSuccess: (data: ShopifyAccessTokenResponse) => void
  ) =>
    useMutation({
      mutationFn: shopifyCustomerAuthApi.getAccessToken,
      retry: false,
      onSuccess,
    })

  return { useGetAccessTokenMutation }
}

export default useShopifyCustomerAuth
