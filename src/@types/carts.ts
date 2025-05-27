import { AttributeInput } from '@shopify/hydrogen-react/storefront-api-types'

export type CartStorage = {
  cartId: string
  expiresAt: string
}

export type UpdateCartNoteAndAttributesRequqest = {
  note: string
  attributes: Array<AttributeInput>
  cartId: string
}
