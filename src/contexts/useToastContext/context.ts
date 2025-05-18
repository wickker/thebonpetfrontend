import { createContext, use } from 'react'

export const ToastType = {
  ERROR: 'ERROR',
  WARN: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
} as const

export type ToastType = (typeof ToastType)[keyof typeof ToastType]

export type ToastContent = {
  title?: string
  message: string
}

export type Toast = {
  id: string
  type: ToastType
} & ToastContent

type ToastContextSchema = {
  toast: {
    error: (e: ToastContent) => void
    warn: (e: ToastContent) => void
    success: (e: ToastContent) => void
    info: (e: ToastContent) => void
    close: (id: string) => void
  }
  toasts: Array<Toast>
}

export const ToastContext = createContext<ToastContextSchema>({
  toast: {
    error: () => {},
    warn: () => {},
    success: () => {},
    info: () => {},
    close: () => {},
  },
  toasts: [],
})

export const useToastContext = () => use(ToastContext)
