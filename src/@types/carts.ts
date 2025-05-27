import {
  AttributeInput,
  CartBuyerIdentityInput,
} from '@shopify/hydrogen-react/storefront-api-types'

export type CartStorage = {
  cartId: string
  expiresAt: string
}

export type UpdateCartNoteAndAttributesRequest = {
  note: string
  attributes: Array<AttributeInput>
  cartId: string
  buyerIdentity: CartBuyerIdentityInput
}
