import {
  CartBuyerIdentityUpdatePayload,
  Cart as CartType,
  Customer as CustomerType,
  CustomerAccessTokenCreateInput,
  CustomerAccessTokenCreatePayload,
  CustomerOrdersArgs,
  CustomerRecoverPayload,
  MutationCartBuyerIdentityUpdateArgs,
  CustomerResetByUrlPayload,
  CustomerCreatePayload,
  CustomerCreateInput,
  MutationCartAttributesUpdateArgs,
  CartAttributesUpdatePayload,
  MutationCartNoteUpdateArgs,
  CartNoteUpdatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { UpdateCartNoteAndAttributesRequqest } from '@/@types/carts'
import Config from '@/configs'
import Cart from '@/graphql/cart'
import Customer from '@/graphql/customer'

const client = createStorefrontApiClient({
  storeDomain: Config.VITE_SHOPIFY_SHOP_URL,
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

const getCustomer = (
  accessToken: string,
  request: CustomerOrdersArgs
): Promise<CustomerType> =>
  client
    .request(Customer.Get, {
      variables: {
        customerAccessToken: accessToken,
        ...request,
      },
    })
    .then((res) => res.data.customer)

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

const updateCartBuyerIdentity = (
  request: MutationCartBuyerIdentityUpdateArgs
): Promise<CartBuyerIdentityUpdatePayload> =>
  client
    .request(Cart.UpdateBuyerIdentity, {
      variables: request,
    })
    .then((res) => res.data.cartBuyerIdentityUpdate)

const sendResetPasswordEmail = (
  email: string
): Promise<CustomerRecoverPayload> =>
  client
    .request(Customer.SendResetPasswordEmail, {
      variables: { email },
    })
    .then((res) => res.data.customerRecover)

const resetPasswordByUrl = (request: {
  password: string
  resetUrl: string
}): Promise<CustomerResetByUrlPayload> =>
  client
    .request(Customer.ResetPasswordByUrl, {
      variables: { password: request.password, resetUrl: request.resetUrl },
    })
    .then((res) => res.data.customerResetByUrl)

// Automatically triggers a 'Customer account confimation' email sent from Shopify
const createCustomer = (
  request: CustomerCreateInput
): Promise<CustomerCreatePayload> =>
  client
    .request(Customer.Create, {
      variables: {
        input: {
          ...request,
          acceptsMarketing: true,
        },
      },
    })
    .then((res) => res.data.customerCreate)

const updateCartAttributes = (
  request: MutationCartAttributesUpdateArgs
): Promise<CartAttributesUpdatePayload> =>
  client
    .request(Cart.UpdateAttributes, {
      variables: request,
    })
    .then((res) => res.data.cartAttributesUpdate)

const updateCartNote = (
  request: MutationCartNoteUpdateArgs
): Promise<CartNoteUpdatePayload> =>
  client
    .request(Cart.UpdateNote, {
      variables: request,
    })
    .then((res) => res.data.cartNoteUpdate)

const updateCartNoteAndAttributes = async (
  request: UpdateCartNoteAndAttributesRequqest
): Promise<Array<CartNoteUpdatePayload | CartAttributesUpdatePayload>> => {
  const tasks = [updateCartAttributes, updateCartNote]
  const results: Array<CartNoteUpdatePayload | CartAttributesUpdatePayload> = []
  for (const task of tasks) {
    const res = await task(request)
    results.push(res)
  }
  return results
}

export default {
  createCustomer,
  createCustomerAccessToken,
  updateCartBuyerIdentity,
  updateCartNote,
  updateCartAttributes,
  updateCartNoteAndAttributes,
  sendResetPasswordEmail,
  resetPasswordByUrl,
  getCart,
  getCustomer,
}
