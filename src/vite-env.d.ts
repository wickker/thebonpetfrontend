/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string
  readonly VITE_FE_BASE_URL: string
  readonly VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID: string
  readonly VITE_SHOPIFY_CUSTOMER_AUTHENTICATION_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
