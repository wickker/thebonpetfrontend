import { PropsWithChildren, useState } from 'react'
import { nanoid } from 'nanoid'
import { Toast, ToastContent, ToastContext, ToastType } from './context'

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Array<Toast>>([])

  const add = (content: ToastContent, type: ToastType) => {
    const id = nanoid()
    setToasts((prev) => [...prev, { ...content, id, type }])
    setTimeout(() => {
      remove(id)
    }, 3000)
  }

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  const toast = {
    error: (content: ToastContent) => add(content, ToastType.ERROR),
    warn: (content: ToastContent) => add(content, ToastType.WARN),
    success: (content: ToastContent) => add(content, ToastType.SUCCESS),
    info: (content: ToastContent) => add(content, ToastType.INFO),
    close: (id: string) => remove(id),
  }

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
