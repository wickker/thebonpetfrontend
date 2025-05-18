import {
  Cart as CartType,
  CustomerAccessTokenCreateInput,
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import Config from '@/configs'
import Cart from '@/graphql/cart'
import Customer from '@/graphql/customer'

const client = createStorefrontApiClient({
  storeDomain: Config.VITE_SHOPIFY_SHOP_DOMAIN,
  apiVersion: Config.VITE_SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: Config.VITE_SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN,
})

// Queries
const getCart = (cartId: string): Promise<CartType> =>
  client
    .request(Cart.Get, {
      variables: { cartId },
    })
    .then((res) => res.data.cart)

// Mutations
const createCustomerAccessToken = (
  request: CustomerAccessTokenCreateInput
): Promise<CustomerAccessTokenCreatePayload> =>
  client
    .request(Customer.CreateAccessToken, {
      variables: {
        input: request,
      },
    })
    .then((res) => res.data.customerAccessTokenCreate)

export default {
  createCustomerAccessToken,
  getCart,
}
