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
  MutationCartLinesUpdateArgs,
  CartLinesUpdatePayload,
  QueryRootProductsArgs,
  ProductConnection,
  CartInput,
  CartCreatePayload,
  MutationCartLinesAddArgs,
  CartLinesAddPayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import {
  UpdateCartNoteBuyerIdentityAndAttributesRequest,
  UpdateCartNoteBuyerIdentityAndAttributesResponse,
} from '@/@types/carts'
import Config from '@/configs'
import Cart from '@/graphql/cart'
import Customer from '@/graphql/customer'
import Product from '@/graphql/product'

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

const getProducts = (
  request: QueryRootProductsArgs
): Promise<ProductConnection> =>
  client
    .request(Product.Get, {
      variables: request,
    })
    .then((res) => res.data.products)

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

const updateCartNoteBuyerIdentityAndAttributes = async (
  request: UpdateCartNoteBuyerIdentityAndAttributesRequest
): Promise<UpdateCartNoteBuyerIdentityAndAttributesResponse> => {
  const tasks = [updateCartAttributes, updateCartNote, updateCartBuyerIdentity]
  const results: UpdateCartNoteBuyerIdentityAndAttributesResponse = []

  for (const task of tasks) {
    const res = await task(request)
    results.push(res)
  }
  return results
}

const updateCartQuantity = (
  request: MutationCartLinesUpdateArgs
): Promise<CartLinesUpdatePayload> =>
  client
    .request(Cart.UpdateQuantity, {
      variables: request,
    })
    .then((res) => res.data.cartLinesUpdate)

const createCart = (request: CartInput): Promise<CartCreatePayload> =>
  client
    .request(Cart.Create, {
      variables: {
        cartInput: request,
      },
    })
    .then((res) => res.data.cartCreate)

const addItemToCart = (
  request: MutationCartLinesAddArgs
): Promise<CartLinesAddPayload> =>
  client
    .request(Cart.AddItem, {
      variables: request,
    })
    .then((res) => res.data.cartLinesAdd)

export default {
  addItemToCart,
  createCart,
  createCustomer,
  createCustomerAccessToken,
  getCart,
  getCustomer,
  getProducts,
  resetPasswordByUrl,
  sendResetPasswordEmail,
  updateCartAttributes,
  updateCartBuyerIdentity,
  updateCartNote,
  updateCartNoteBuyerIdentityAndAttributes,
  updateCartQuantity,
}
