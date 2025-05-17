import axios from 'axios'
import {
  ShopifyAccessTokenRequest,
  ShopifyAccessTokenResponse,
} from '@/@types/shopifyCustomerAuth'
import Config from '@/configs'

const shopifyCustomerAuthApi = axios.create({
  baseURL: Config.VITE_SHOPIFY_CUSTOMER_AUTHENTICATION_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// POST
const getAccessToken = (
  request: ShopifyAccessTokenRequest
): Promise<ShopifyAccessTokenResponse> => {
  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('client_id', Config.VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID)
  body.append('redirect_uri', Config.VITE_FE_BASE_URL)
  body.append('code', request.code)
  body.append('code_verifier', request.code_verifier)

  return shopifyCustomerAuthApi
    .post('/oauth/token', body.toString())
    .then((res) => res.data)
}

export default { getAccessToken }
