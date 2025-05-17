import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DateTime } from 'luxon'
import {
  AccessTokenStorage,
  AccessTokenStorageSchema,
  ShopifyAccessTokenRequest,
  ShopifyAccessTokenResponse,
  ShopifyRefreshTokenResponse,
} from '@/@types/shopifyCustomerAuth'
import useShopifyCustomerAuth from '@/hooks/queries/useShopifyCustomerAuth'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { jsonSafeParse } from '@/utils/functions'

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

const ShopifyAuth = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const code = searchParams.get('code')
  const existingToken = jsonSafeParse<AccessTokenStorage>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN) || '',
    AccessTokenStorageSchema
  )
  const { useGetAccessTokenMutation, useRefreshTokenMutation } =
    useShopifyCustomerAuth()
  const getAccessToken = useGetAccessTokenMutation(handleGetAccessTokenSuccess)
  const refreshToken = useRefreshTokenMutation(handleRefreshTokenSuccess)

  function handleRefreshTokenSuccess(data: ShopifyRefreshTokenResponse) {
    const accessToken: AccessTokenStorage = {
      access_token: data.access_token,
      expires_at: DateTime.now().plus({ seconds: data.expires_in }).toISO(),
      refresh_token: data.refresh_token,
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN,
      JSON.stringify(accessToken)
    )
  }

  function handleGetAccessTokenSuccess(data: ShopifyAccessTokenResponse) {
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

    setSearchParams({})
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

  // refresh token if it has expired
  useEffect(() => {
    if (!existingToken?.expires_at) return
    const tokenHasExpired =
      DateTime.fromISO(existingToken.expires_at) < DateTime.now()
    if (tokenHasExpired) {
      refreshToken.mutate(existingToken.refresh_token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingToken])

  return <Outlet />
}

export default ShopifyAuth
