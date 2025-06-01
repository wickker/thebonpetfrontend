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

export type CartForm = {
  note: string
  date: string
  timeSlot: string
}

export type DeliveryDetails = {
  date: string
  day: string
  time_slot: string
  customer_time_zone: string
}

export type OrderItem = {
  name: string
  quantity: number
  frequency: string
  delivery_date: string
  time_slot: string
  next_delivery_date: string
  variant_id: string
}
