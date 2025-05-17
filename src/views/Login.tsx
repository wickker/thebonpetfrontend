import { useEffect } from 'react'
import Config from '@/configs'

const Login = () => {
  async function generateCodeVerifier() {
    const rando = generateRandomCode()
    return base64UrlEncode(rando)
  }

  async function generateState(): Promise<string> {
    const timestamp = Date.now().toString()
    const randomString = Math.random().toString(36).substring(2)
    return timestamp + randomString
  }

  async function generateNonce(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let nonce = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      nonce += characters.charAt(randomIndex)
    }

    return nonce
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const digestOp = await crypto.subtle.digest(
      { name: 'SHA-256' },
      new TextEncoder().encode(codeVerifier)
    )
    const hash = convertBufferToString(digestOp)
    return base64UrlEncode(hash)
  }

  function generateRandomCode() {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return String.fromCharCode.apply(null, Array.from(array))
  }

  function base64UrlEncode(str: string) {
    const base64 = btoa(str)
    // this is to ensure that the encoding does not have +, /, or = characters in it.
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  function convertBufferToString(hash: ArrayBuffer) {
    const uintArray = new Uint8Array(hash)
    const numberArray = Array.from(uintArray)
    return String.fromCharCode(...numberArray)
  }

  const goToAuthorizationRequestUrl = async () => {
    const clientId = Config.VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID
    const authorizationRequestUrl = new URL(
      'https://shopify.com/authentication/66843738169/oauth/authorize'
    )

    authorizationRequestUrl.searchParams.append(
      'scope',
      'openid email customer-account-api:full'
    )
    authorizationRequestUrl.searchParams.append('client_id', clientId)
    authorizationRequestUrl.searchParams.append('response_type', 'code')
    authorizationRequestUrl.searchParams.append(
      'redirect_uri',
      'https://043b-112-199-166-27.ngrok-free.app'
    )
    authorizationRequestUrl.searchParams.append('state', await generateState())
    const nonce = await generateNonce(16)
    authorizationRequestUrl.searchParams.append('nonce', nonce)

    // Public client
    const verifier = await generateCodeVerifier()
    const challenge = await generateCodeChallenge(verifier)
    localStorage.setItem('code-verifier', verifier)
    localStorage.setItem('nonce', nonce)
    authorizationRequestUrl.searchParams.append('code_challenge', challenge)
    authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256')

    window.location.href = authorizationRequestUrl.toString()
  }

  useEffect(() => {
    goToAuthorizationRequestUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>Login</div>
}

export default Login
