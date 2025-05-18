import { CustomerAccessTokenCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'

const useCustomer = () => {
  const useCreateCustomerAccessTokenMutation = (
    onSuccess: (data: CustomerAccessTokenCreatePayload) => void
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
