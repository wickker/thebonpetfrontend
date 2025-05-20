export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'tbp_access_token', // CustomerAccessToken
  CART: 'tbp_cart', // CartStorage
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
} as const
