import { useEffect } from 'react'
import Config from '@/configs'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'

const generateCodeVerifier = async () => {
  const rando = generateRandomCode()
  return base64UrlEncode(rando)
}

const generateState = async () => {
  const timestamp = Date.now().toString()
  const randomString = Math.random().toString(36).substring(2)
  return timestamp + randomString
}

const generateNonce = async (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let nonce = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    nonce += characters.charAt(randomIndex)
  }

  return nonce
}

const generateCodeChallenge = async (codeVerifier: string) => {
  const digestOp = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(codeVerifier)
  )
  const hash = convertBufferToString(digestOp)
  return base64UrlEncode(hash)
}

const generateRandomCode = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return String.fromCharCode.apply(null, Array.from(array))
}

const base64UrlEncode = (str: string) => {
  const base64 = btoa(str)
  // ensures that the encoding does not have +, /, or = characters in it
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

const convertBufferToString = (hash: ArrayBuffer) => {
  const uintArray = new Uint8Array(hash)
  const numberArray = Array.from(uintArray)
  return String.fromCharCode(...numberArray)
}

const goToAuthorizationRequestUrl = async () => {
  const url = new URL(
    `${Config.VITE_SHOPIFY_CUSTOMER_AUTHENTICATION_BASE_URL}/oauth/authorize`
  )

  url.searchParams.append('scope', 'openid email customer-account-api:full')
  url.searchParams.append(
    'client_id',
    Config.VITE_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID
  )
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('redirect_uri', Config.VITE_FE_BASE_URL)
  url.searchParams.append('state', await generateState())
  const nonce = await generateNonce(16)
  const verifier = await generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)
  url.searchParams.append('nonce', nonce)
  url.searchParams.append('code_challenge', challenge)
  url.searchParams.append('code_challenge_method', 'S256')

  localStorage.setItem(LOCAL_STORAGE_KEYS.CODE_VERIFIER, verifier)
  localStorage.setItem(LOCAL_STORAGE_KEYS.NONCE, nonce)

  window.location.href = url.toString()
}

const Login = () => {
  useEffect(() => {
    goToAuthorizationRequestUrl() // redirects to shopify-hosted oauth page
  }, [])

  return <></>
}

export default Login
