export const LOCAL_STORAGE_KEYS = {
  CODE_VERIFIER: 'tbp_code_verifier',
  NONCE: 'tbp_nonce',
  STATE: 'tbp_state',
  CUSTOMER_ACCESS_TOKEN: 'tbp_customer_access_token',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_RESOLVE: '/login/resolve',
} as const
