import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import { DateTime } from 'luxon'
import {
  AccessTokenStorage,
  ShopifyAccessTokenRequest,
  ShopifyAccessTokenResponse,
} from '@/@types/shopifyCustomerAuth'
import Config from '@/configs'
import useShopifyCustomerAuth from '@/hooks/queries/useShopifyCustomerAuth'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'

const getNonce = (token: string) => decodeJwt(token).payload.nonce

const decodeJwt = (token: string) => {
  const [header, payload, signature] = token.split('.')
  const decodedHeader = JSON.parse(atob(header))
  const decodedPayload = JSON.parse(atob(payload))
  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature,
  }
}

const LoginResolve = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const { useGetAccessTokenMutation } = useShopifyCustomerAuth()
  const getAccessToken = useGetAccessTokenMutation(handleGetAccessTokenSuccess)

  function handleGetAccessTokenSuccess(data: ShopifyAccessTokenResponse) {
    // check state matches
    const state = localStorage.getItem(LOCAL_STORAGE_KEYS.STATE)
    if (!state) {
      toast.error('No state found') // TODO: Add title
      return
    }
    const paramsState = searchParams.get('state')
    if (paramsState !== state) {
      toast.error('Invalid state') // TODO: Add title
      return
    }

    // check nonce matches
    const nonce = localStorage.getItem(LOCAL_STORAGE_KEYS.NONCE)
    if (!nonce) {
      toast.error('No nonce found') // TODO: Add title
      return
    }
    const tokenNonce = getNonce(data.id_token)
    if (tokenNonce !== nonce) {
      toast.error('Invalid nonce') // TODO: Add title
      return
    }

    const accessToken: AccessTokenStorage = {
      access_token: data.access_token,
      expires_at: DateTime.now().plus({ seconds: data.expires_in }).toISO(),
      id_token: data.id_token,
      refresh_token: data.refresh_token,
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN,
      JSON.stringify(accessToken)
    )

    window.location.href = Config.VITE_FE_BASE_URL
  }

  // authenticate user and get access token if code is present
  useEffect(() => {
    if (!code) return

    const request: ShopifyAccessTokenRequest = {
      code,
      code_verifier:
        localStorage.getItem(LOCAL_STORAGE_KEYS.CODE_VERIFIER) || '',
    }
    getAccessToken.mutate(request)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return <></>
}

export default LoginResolve
