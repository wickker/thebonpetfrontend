import {
  CustomerAccessTokenCreatePayload,
  CustomerAccessTokenCreateWithMultipassPayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { ClientResponse } from '@shopify/storefront-api-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'

const useCustomer = () => {
  const useGetCustomerDetailsQuery = () => {
    return useQuery({
      queryKey: ['customer'],
      queryFn: () =>
        shopifyStorefrontApi.getCustomerDetails(
          '48baee8b80d7877d3e4400e9ba041de1'
        ),
      retry: false,
    })
  }

  const useCreateCustomerAccessTokenMutation = (
    onSuccess: (data: ClientResponse<CustomerAccessTokenCreatePayload>) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.createCustomerAccessToken,
      retry: false,
      onSuccess,
    })

  const useCreateCustomerAccessTokenWithMultipassMutation = (
    onSuccess: (
      data: ClientResponse<CustomerAccessTokenCreateWithMultipassPayload>
    ) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.createCustomerAccessTokenWithMultipass,
      retry: false,
      onSuccess,
    })

  return {
    useGetCustomerDetailsQuery,
    useCreateCustomerAccessTokenMutation,
    useCreateCustomerAccessTokenWithMultipassMutation,
  }
}

export default useCustomer
