export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'tbp_access_token', // CustomerAccessToken
  CART: 'tbp_cart', // CartStorage
  PROMO_DISMISSED_EXPIRY: 'tbp_promo_dismissed_expiry',
} as const

export const ROUTES = {
  HOME: '/',
  DOGS: '/dogs',
  CATS: '/cats',
  BLOG: '/blog',
  FEEDING_GUIDE: '/feeding-guide',
  PET_FOOD_CALCULATOR: '/pet-food-calculator',
  DONATE: '/donate',
  CONTACT: '/contact',
  REFUND_POLICY: '/refund-policy',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  CANCELLATION_POLICY: '/cancellation-policy',

  // needs to match Shopify urls for smooth redirects
  LOGIN: '/account/login',
  SIGNUP: '/account/register',
  RESET_PASSWORD: '/account/login#recover',
  SUBMIT_NEW_PASSWORD: '/account/reset/*',
  ACCOUNT: '/account',
} as const
