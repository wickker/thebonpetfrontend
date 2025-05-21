import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { DateTime } from 'luxon'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const CheckAuth = () => {
  useEffect(() => {
    const token = getTokenJsonFromLocalStorage()
    if (token) {
      const expiresAt = DateTime.fromISO(token.expiresAt)
      if (DateTime.now() > expiresAt) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      }
    }
  }, [])

  return <Outlet />
}

export default CheckAuth
