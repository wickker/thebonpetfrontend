/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string
  readonly VITE_FE_BASE_URL: string
  readonly VITE_SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN: string
  readonly VITE_SHOPIFY_SHOP_URL: string
  readonly VITE_SHOPIFY_STOREFRONT_API_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
