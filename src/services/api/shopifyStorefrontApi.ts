import {
  CustomerAccessTokenCreateInput,
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import Config from '@/configs'
import Customers from '@/graphql/customers'

const client = createStorefrontApiClient({
  storeDomain: Config.VITE_SHOPIFY_SHOP_DOMAIN,
  apiVersion: Config.VITE_SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: Config.VITE_SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN,
})

// Queries

// Mutations
const createCustomerAccessToken = (
  request: CustomerAccessTokenCreateInput
): Promise<CustomerAccessTokenCreatePayload> =>
  client
    .request(Customers.CreateAccessToken, {
      variables: {
        input: request,
      },
    })
    .then((res) => res.data.customerAccessTokenCreate)

export default {
  createCustomerAccessToken,
}
