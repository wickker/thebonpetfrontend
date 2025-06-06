import { motion } from 'framer-motion'
import { FaInfoCircle } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { PiWarningCircleFill } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'
import { RxCrossCircled } from 'react-icons/rx'
import { ToastType } from '@/contexts/useToastContext/context'
import { cn } from '@/utils/functions'

type TileProps = {
  type: ToastType
  message: string
  title?: string
  onClose: () => void
  className?: string
}

const Tile = ({
  type = ToastType.SUCCESS,
  message = '',
  title = '',
  onClose,
  className,
}: TileProps) => {
  const getIcon = () => {
    switch (type) {
      case ToastType.ERROR:
        return <RxCrossCircled className='h-8 w-8 text-[#f2355c]' />
      case ToastType.INFO:
        return <FaInfoCircle className='h-8 w-8 text-[#3086eb]' />
      case ToastType.WARN:
        return <PiWarningCircleFill className='h-8 w-8 text-[#f8c021]' />
      case ToastType.SUCCESS:
      default:
        return <FaCircleCheck className='h-8 w-8 text-[#50d764]' />
    }
  }

  return (
    <motion.div
      className={cn(
        'grid h-fit w-full max-w-lg grid-cols-[auto_1fr] overflow-hidden bg-white shadow-lg',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={cn(
          'w-[10px] bg-[#50d764]',
          type === ToastType.ERROR && 'bg-[#f2355c]',
          type === ToastType.INFO && 'bg-[#3086eb]',
          type === ToastType.WARN && 'bg-[#f8c021]'
        )}
      />

      <div className='flex flex-col px-4 py-3'>
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-4'>
          {getIcon()}

          <div className='text-dark-gray'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl'>
                {title ||
                  `${type.charAt(0).toUpperCase()}${type.toLowerCase().slice(1)}`}
              </h1>
              <button onClick={onClose} className='cursor-pointer'>
                <RxCross2 className='h-7 w-7' />
              </button>
            </div>

            <p className='text-md text-dark-gray'>{message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Tile
