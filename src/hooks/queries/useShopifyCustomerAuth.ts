import { useMutation } from '@tanstack/react-query'
import {
  ShopifyAccessTokenResponse,
  ShopifyRefreshTokenResponse,
} from '@/@types/shopifyCustomerAuth'
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

  const useRefreshTokenMutation = (
    onSuccess: (data: ShopifyRefreshTokenResponse) => void
  ) =>
    useMutation({
      mutationFn: shopifyCustomerAuthApi.refreshToken,
      retry: false,
      onSuccess,
    })

  return { useGetAccessTokenMutation, useRefreshTokenMutation }
}

export default useShopifyCustomerAuth
