export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'tbp_access_token', // CustomerAccessToken
  CART: 'tbp_cart', // CartStorage
} as const

export const ROUTES = {
  HOME: '/',

  // needs to match Shopify urls for smooth redirects
  LOGIN: '/account/login',
  SIGNUP: '/account/register',
  RESET_PASSWORD: '/account/login#recover',
} as const
