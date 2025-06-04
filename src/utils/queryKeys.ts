export const QUERY_KEYS = {
  GET_CART: (cartId?: string) => ['cart', cartId],
  GET_CUSTOMER: ['customer'],
  GET_PRODUCTS: ['products'],
} as const
