import { CustomerAccessTokenCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { ClientResponse } from '@shopify/storefront-api-client'
import { useMutation } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'

const useCustomer = () => {
  const useCreateCustomerAccessTokenMutation = (
    onSuccess: (data: ClientResponse<CustomerAccessTokenCreatePayload>) => void
  ) =>
    useMutation({
      mutationFn: shopifyStorefrontApi.createCustomerAccessToken,
      retry: false,
      onSuccess,
    })

  return {
    useCreateCustomerAccessTokenMutation,
  }
}

export default useCustomer
