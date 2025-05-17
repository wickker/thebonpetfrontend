import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import Config from '@/configs'

// interface AccessTokenResponse {
//   access_token: string
//   expires_in: number
//   id_token: string
//   refresh_token: string
// }

const ShopifyAuth = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  function getNonce(token: string) {
    return decodeJwt(token).payload.nonce
  }

  function decodeJwt(token: string) {
    const [header, payload, signature] = token.split('.')

    const decodedHeader = JSON.parse(atob(header))
    const decodedPayload = JSON.parse(atob(payload))

    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature,
    }
  }

  const getAccessToken = async (code: string) => {
    const clientId = Config.VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID
    const body = new URLSearchParams()

    body.append('grant_type', 'authorization_code')
    body.append('client_id', clientId)
    body.append('redirect_uri', 'https://043b-112-199-166-27.ngrok-free.app')
    body.append('code', code)

    // Public Client
    const codeVerifier = localStorage.getItem('code-verifier')
    if (!codeVerifier) {
      throw new Error('No code verifier found')
    }
    body.append('code_verifier', codeVerifier)

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
    }

    const response = await fetch(
      'https://shopify.com/authentication/66843738169/oauth/token',
      {
        method: 'POST',
        headers: headers,
        body,
      }
    )
    const token = await response.json()

    const nonce = localStorage.getItem('nonce')
    if (!nonce) {
      throw new Error('No nonce found')
    }
    const tokenNonce = getNonce(token.id_token)
    console.log('tokenNonce : ', tokenNonce)
    if (tokenNonce !== nonce) {
      throw new Error('Invalid nonce')
    }

    const tokenMod = {
      access_token: token.access_token,
      expires_at: DateTime.now().plus({ seconds: token.expires_in }).toString(),
      id_token: token.id_token,
      refresh_token: token.refresh_token,
    }

    console.log('tokenMod : ', tokenMod)

    localStorage.setItem('tbp_access_token', JSON.stringify(tokenMod))
  }

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      console.log('No code found')
      return
    }
    getAccessToken(code)
    setSearchParams({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return <Outlet />
}

export default ShopifyAuth
