export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'tbp_access_token',

  // experimental login flow
  CODE_VERIFIER: 'tbp_code_verifier',
  NONCE: 'tbp_nonce',
  STATE: 'tbp_state',
  CUSTOMER_ACCESS_TOKEN: 'tbp_customer_access_token',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',

  // experimental login flow
  LOGIN_BETA: '/login/beta',
  LOGIN_RESOLVE: '/login/resolve',
} as const
