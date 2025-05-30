import { ReactNode } from 'react'
import { FiXCircle } from 'react-icons/fi'
import { cn } from '@/utils/functions'

type EmptyDisplayProps = {
  icon?: ReactNode
  title: string
  description: string
  className?: string
}

const EmptyDisplay = ({
  icon = <FiXCircle className='text-dark-green/90 h-16 w-16' />,
  title,
  description,
  className,
}: EmptyDisplayProps) => {
  return (
    <div
      className={cn('flex flex-col items-center gap-y-4 px-4 py-8', className)}
    >
      {icon}
      <p className='text-dark-green text-center text-lg'>{title}</p>
      <p className='text-dark-green/80 text-center'>{description}</p>
    </div>
  )
}

export default EmptyDisplay
