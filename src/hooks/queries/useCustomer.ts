import {
  CustomerAccessTokenCreatePayload,
  CustomerOrdersArgs,
  CustomerRecoverPayload,
  CustomerResetByUrlPayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'
import { QUERY_KEYS } from '@/utils/queryKeys'

const useCustomer = () => {
  const useCreateCustomerAccessTokenMutation = (
    onSuccess: (data: CustomerAccessTokenCreatePayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.createCustomerAccessToken,
      retry: false,
      onSuccess,
    })

  const useSendResetPasswordEmailMutation = (
    onSuccess: (data: CustomerRecoverPayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.sendResetPasswordEmail,
      retry: false,
      onSuccess,
    })

  const useGetCustomerQuery = (
    accessToken: string,
    request: CustomerOrdersArgs
  ) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CUSTOMER,
      retry: false,
      enabled: !!accessToken,
      queryFn: () => shopifyStorefrontApi.getCustomer(accessToken, request),
    })

  const useCustomerResetByUrlMutation = (
    onSuccess: (data: CustomerResetByUrlPayload) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.resetPasswordByUrl,
      retry: false,
      onSuccess,
    })

  return {
    useCreateCustomerAccessTokenMutation,
    useSendResetPasswordEmailMutation,
    useGetCustomerQuery,
    useCustomerResetByUrlMutation,
  }
}

export default useCustomer
