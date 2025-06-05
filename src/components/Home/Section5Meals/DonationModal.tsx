import { PropsWithChildren, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'motion/react'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '@/components/commons'

const DonationModal = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<string>('Wildflower')

  const handleClose = () => setOpen(false)

  const handleSelectOrg = (org: string) => setSelectedOrg(org)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogOverlay className='fixed inset-0 bg-black opacity-70' />
            <DialogContent
              className='bg-cream text-dark-brown fixed top-[50%] left-[50%] flex max-h-[85dvh] w-[90dvw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-lg p-1'
              aria-describedby={undefined}
            >
              <button className='cursor-pointer self-end' onClick={handleClose}>
                <RxCross2 className='h-6 w-6' />
              </button>

              <div className='flex flex-col items-center px-4 pb-4'>
                <DialogTitle className='text-dark-brown mb-4 text-center text-4xl font-bold'>
                  How would you like to donate?
                </DialogTitle>

                <div className='mb-2 flex items-center gap-x-8 text-lg font-bold'>
                  {['Wildflower', 'Luni'].map((org) => (
                    <label className='flex items-center gap-x-2' key={org}>
                      <input
                        type='radio'
                        value={org}
                        checked={selectedOrg === org}
                        onChange={() => handleSelectOrg(org)}
                        className='accent-green h-4 w-4'
                      />
                      {org}
                    </label>
                  ))}
                </div>

                <Button.Quantity
                  quantity={1}
                  onMinus={() => {}}
                  onAdd={() => {}}
                />
              </div>
            </DialogContent>
          </motion.div>
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  )
}

export default DonationModal
