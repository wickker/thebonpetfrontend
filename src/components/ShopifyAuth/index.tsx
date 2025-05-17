import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DateTime } from 'luxon'
import {
  AccessTokenStorage,
  ShopifyAccessTokenRequest,
  ShopifyAccessTokenResponse,
} from '@/@types/shopifyCustomerAuth'
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

const ShopifyAuth = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const code = searchParams.get('code')
  const { useGetAccessTokenMutation } = useShopifyCustomerAuth()
  const getAccessToken = useGetAccessTokenMutation(handleGetAccessTokenSuccess)

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
      expires_at: DateTime.now().plus({ seconds: data.expires_in }).toString(),
      id_token: data.id_token,
      refresh_token: data.refresh_token,
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN,
      JSON.stringify(accessToken)
    )

    setSearchParams({})
  }

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

  return <Outlet />
}

export default ShopifyAuth
