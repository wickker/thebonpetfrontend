import axios from 'axios'
import {
  ShopifyAccessTokenRequest,
  ShopifyAccessTokenResponse,
  ShopifyRefreshTokenResponse,
} from '@/@types/shopifyCustomerAuth'
import Config from '@/configs'
import { ROUTES } from '@/utils/constants'

const shopifyCustomerAuthApi = axios.create({
  baseURL: Config.VITE_SHOPIFY_CUSTOMER_AUTHENTICATION_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// POST
const getAccessToken = async (
  request: ShopifyAccessTokenRequest
): Promise<ShopifyAccessTokenResponse> => {
  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('client_id', Config.VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID)
  body.append(
    'redirect_uri',
    `${Config.VITE_FE_BASE_URL}${ROUTES.LOGIN_RESOLVE}`
  )
  body.append('code', request.code)
  body.append('code_verifier', request.code_verifier)

  return shopifyCustomerAuthApi
    .post('/oauth/token', body.toString())
    .then((res) => res.data)
}

const refreshToken = async (
  refreshToken: string
): Promise<ShopifyRefreshTokenResponse> => {
  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', refreshToken)
  body.append('client_id', Config.VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID)

  return shopifyCustomerAuthApi
    .post('/oauth/token', body.toString())
    .then((res) => res.data)
}

export default { getAccessToken, refreshToken }
