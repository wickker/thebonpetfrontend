import { createPortal } from 'react-dom'
import { AnimatePresence } from 'motion/react'
import { useToastContext } from '@/contexts/useToastContext/context'
import Tile from './Tile'

const Toast = () => {
  const { toast, toasts } = useToastContext()

  return createPortal(
    <div className='fixed top-0 right-0 left-0 z-100 mx-auto flex max-w-lg flex-col items-center gap-y-3 py-4'>
      <AnimatePresence>
        {toasts.map((t) => (
          <Tile key={t.id} onClose={() => toast.close(t.id)} {...t} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}

export default Toast
