import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import {
  ShopifyAccessTokenResponse,
  ShopifyRefreshTokenResponse,
} from '@/@types/shopifyCustomerAuth'
import shopifyCustomerAuthApi from '@/services/api/shopifyCustomerAuthApi'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'

const useCustomerAuth = () => {
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
      onError: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN)
        toast.error('Failed to refresh access token, please re-login') // TODO: Add title
      },
    })

  return { useGetAccessTokenMutation, useRefreshTokenMutation }
}

export default useCustomerAuth
