import { PropsWithChildren, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  // DialogTitle,
} from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'motion/react'
import { RxCross2 } from 'react-icons/rx'

const DonationModal = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=''
          >
            <DialogOverlay className='fixed inset-0 bg-black opacity-70' />
            <DialogContent
              className='bg-cream text-dark-brown fixed top-[50%] left-[50%] flex max-h-[85dvh] w-[90dvw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-lg p-1'
              aria-describedby={undefined}
            >
              <button className='self-end'>
                <RxCross2 className='h-6 w-6' />
              </button>
            </DialogContent>
          </motion.div>
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  )
}

export default DonationModal
