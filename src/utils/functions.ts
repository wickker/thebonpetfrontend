import { toast } from 'react-toastify'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodSchema } from 'zod'
import { AccessTokenStorage } from '@/@types/shopifyCustomerAuth'
import Config from '@/configs'
import { LOCAL_STORAGE_KEYS } from './constants'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const jsonSafeParse = <T>(s: string, schema?: ZodSchema) => {
  try {
    const json: T = JSON.parse(s)
    if (!schema) return json

    return schema.parse(json) as T
  } catch (e) {
    console.error(`Error parsing stringified json [string: ${s}]: ${e}`)
  }
}

export const getTokenJsonBeta = (): AccessTokenStorage | undefined => {
  const existingTokenStr = localStorage.getItem(
    LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN
  )
  return existingTokenStr
    ? jsonSafeParse<AccessTokenStorage>(existingTokenStr)
    : undefined
}

export const handleLogoutBeta = () => {
  const existingToken = getTokenJsonBeta()
  if (!existingToken?.id_token) {
    toast.error('No id_token found') // TODO: Add title
    return
  }
  const url = new URL(
    `${Config.VITE_SHOPIFY_CUSTOMER_AUTHENTICATION_BASE_URL}/logout`
  )
  url.searchParams.append('id_token_hint', existingToken.id_token)
  url.searchParams.append('post_logout_redirect_uri', Config.VITE_FE_BASE_URL)

  localStorage.removeItem(LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN)

  window.location.href = url.toString()
}
