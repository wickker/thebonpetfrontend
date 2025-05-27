import {
  AttributeInput,
  CartAttributesUpdatePayload,
  CartBuyerIdentityInput,
  CartBuyerIdentityUpdatePayload,
  CartNoteUpdatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'

export type CartStorage = {
  cartId: string
  expiresAt: string
}

export type UpdateCartNoteBuyerIdentityAndAttributesRequest = {
  note: string
  attributes: Array<AttributeInput>
  cartId: string
  buyerIdentity: CartBuyerIdentityInput
}

export type UpdateCartNoteBuyerIdentityAndAttributesResponse = Array<
  | CartNoteUpdatePayload
  | CartAttributesUpdatePayload
  | CartBuyerIdentityUpdatePayload
>
