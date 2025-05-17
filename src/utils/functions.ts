import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodSchema } from 'zod'
import { AccessTokenStorage } from '@/@types/shopifyCustomerAuth'
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

export const getTokenJson = (): AccessTokenStorage | undefined => {
  const existingTokenStr = localStorage.getItem(
    LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN
  )
  return existingTokenStr
    ? jsonSafeParse<AccessTokenStorage>(existingTokenStr)
    : undefined
}
