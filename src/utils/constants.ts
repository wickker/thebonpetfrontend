export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'tbp_access_token', // CustomerAccessToken
  CART: 'tbp_cart', // CartStorage
  PROMO_DISMISSED_EXPIRY: 'tbp_promo_dismissed_expiry',
} as const

export const ATTRIBUTE_KEYS = {
  DELIVERY_DETAILS: 'tbp_delivery_details',
  ITEMS: 'tbp_items',
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
  PRIVACY_POLICY: '/privacy-policy',
  CANCELLATION_POLICY: '/cancellation-policy',

  // match Shopify urls for smooth redirects
  CART: '/cart',
  REFUND_POLICY: '/policies/refund-policy',
  TERMS_OF_SERVICE: '/policies/terms-of-service',
  LOGIN: '/account/login',
  SIGNUP: '/account/register',
  RESET_PASSWORD: '/account/login#recover',
  SUBMIT_NEW_PASSWORD: '/account/reset/*',
  ACCOUNT: '/account',
} as const

export const LINKS = {
  INSTAGRAM: 'https://www.instagram.com/thebonpet',
  WHATSAPP: 'https://wa.me/6590108515',
  TELEGRAM: 'https://t.me/thebonpet',
  MAIL: 'mailto:hello@thebonpet.com',
  NINJA_COLD: 'https://www.ninjavan.co/en-sg/logistics-solutions/cold-chain',
  WILDFLOWER_STUDIO: 'https://www.wildflowerstudio.sg/',
  LUNI: 'https://luni-singapore.com/',
} as const
