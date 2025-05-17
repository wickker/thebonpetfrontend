import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { DateTime } from 'luxon'
import {
  AccessTokenStorage,
  ShopifyRefreshTokenResponse,
} from '@/@types/shopifyCustomerAuth'
import useCustomerAuth from '@/hooks/queries/useCustomerAuth'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { getTokenJsonBeta } from '@/utils/functions'

const RefreshTokenRequired = () => {
  const existingToken = getTokenJsonBeta()
  const { useRefreshTokenMutation } = useCustomerAuth()
  const refreshToken = useRefreshTokenMutation(handleRefreshTokenSuccess)

  function handleRefreshTokenSuccess(data: ShopifyRefreshTokenResponse) {
    const accessToken: AccessTokenStorage = {
      access_token: data.access_token,
      expires_at: DateTime.now().plus({ seconds: data.expires_in }).toISO(),
      refresh_token: data.refresh_token,
      id_token: existingToken?.id_token || '',
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN,
      JSON.stringify(accessToken)
    )
  }

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

export default RefreshTokenRequired
