export const QUERY_KEYS = {
  GET_CART: (cartId?: string) => ['cart', cartId],
  GET_CUSTOMER: ['customer'],
} as const
