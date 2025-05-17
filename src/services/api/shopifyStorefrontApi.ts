import {
  Customer,
  CustomerAccessTokenCreateInput,
  CustomerAccessTokenCreatePayload,
  CustomerAccessTokenCreateWithMultipassPayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import {
  ClientResponse,
  createStorefrontApiClient,
} from '@shopify/storefront-api-client'
import Config from '@/configs'
import Customers from '@/graphql/customers'

const client = createStorefrontApiClient({
  storeDomain: Config.VITE_SHOPIFY_SHOP_DOMAIN,
  apiVersion: Config.VITE_SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: Config.VITE_SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN,
})

// Queries
const getCustomerDetails = (
  accessToken: string
): Promise<ClientResponse<{ customer: Customer }>> =>
  client.request(Customers.Get, {
    variables: {
      customerAccessToken: accessToken,
    },
  })

// Mutations
const createCustomerAccessToken = (
  request: CustomerAccessTokenCreateInput
): Promise<ClientResponse<CustomerAccessTokenCreatePayload>> =>
  client.request(Customers.CreateAccessToken, {
    variables: {
      input: request,
    },
  })

const createCustomerAccessTokenWithMultipass = (
  token: string
): Promise<ClientResponse<CustomerAccessTokenCreateWithMultipassPayload>> =>
  client.request(Customers.CreateAccessTokenWithMultipass, {
    variables: {
      multipassToken: token,
    },
  })

export default {
  getCustomerDetails,
  createCustomerAccessToken,
  createCustomerAccessTokenWithMultipass,
}
