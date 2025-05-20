export const QUERY_KEYS = {
  GET_CART: (cartId?: string) => ['carts', cartId],
  GET_CUSTOMER: ['customer'],
} as const
