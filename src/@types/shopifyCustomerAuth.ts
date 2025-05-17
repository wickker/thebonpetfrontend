import { z } from 'zod'

// Requests
export const ShopifyAccessTokenRequestSchema = z.object({
  code: z.string(),
  code_verifier: z.string(),
})

// Responses
export const ShopifyAccessTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  id_token: z.string(),
  refresh_token: z.string(),
})

export const ShopifyRefreshTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
})

export const AccessTokenStorageSchema = z.object({
  access_token: z.string(),
  expires_at: z.string(),
  id_token: z.string(),
  refresh_token: z.string(),
})

export type AccessTokenStorage = z.infer<typeof AccessTokenStorageSchema>
export type ShopifyAccessTokenRequest = z.infer<
  typeof ShopifyAccessTokenRequestSchema
>
export type ShopifyAccessTokenResponse = z.infer<
  typeof ShopifyAccessTokenResponseSchema
>
export type ShopifyRefreshTokenResponse = z.infer<
  typeof ShopifyRefreshTokenResponseSchema
>
