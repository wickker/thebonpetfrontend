import { memo } from 'react'
import { DateTime } from 'luxon'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

type MonthTogglerProps = {
  month: number
  year: number
  onNext: () => void
  onPrevious: () => void
}

const MonthToggler = ({
  month,
  year,
  onNext,
  onPrevious,
}: MonthTogglerProps) => {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] items-center px-1'>
      <button onClick={onPrevious} className='cursor-pointer'>
        <FaChevronLeft />
      </button>
      <h1 className='text-center font-bold'>
        {DateTime.fromObject({ month }).toFormat('LLL')} {year}
      </h1>
      <button onClick={onNext} className='cursor-pointer'>
        <FaChevronRight />
      </button>
    </div>
  )
}

export default memo(MonthToggler)
