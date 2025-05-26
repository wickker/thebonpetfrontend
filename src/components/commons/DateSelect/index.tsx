import { useCallback, useState } from 'react'
import { DateTime } from 'luxon'
import CalendarCells from './CalendarCells'
import { DATE_FORMAT } from './dateSelect'
import MonthToggler from './MonthToggler'

type DateSelectProps = {
  date?: string
  onSelectDate?: () => void
}

const DateSelect = ({ date, onSelectDate }: DateSelectProps) => {
  const now = DateTime.now().plus({ day: 8 }).toFormat(DATE_FORMAT)
  const [selectedDate, setSelectedDate] = useState(date || now)
  const selectedDateTime = DateTime.fromFormat(selectedDate, DATE_FORMAT)
  const [month, setMonth] = useState(selectedDateTime.month)
  const [year, setYear] = useState(selectedDateTime.year)

  const handleGoToNextMonth = useCallback(() => {
    if (month + 1 > 12) {
      setMonth(1)
      setYear((prev) => prev + 1)
      return
    }
    setMonth((prev) => prev + 1)
  }, [month])

  const handleGoToPreviousMonth = useCallback(() => {
    if (month - 1 < 1) {
      setMonth(12)
      setYear((prev) => prev - 1)
      return
    }
    setMonth((prev) => prev - 1)
  }, [month])

  const handleSelectDate = (date: DateTime) => {
    setSelectedDate(date.toFormat(DATE_FORMAT))
    onSelectDate?.()
  }

  return (
    <div className='text-dark-green flex w-fit flex-col gap-y-2 p-4'>
      <MonthToggler
        month={month}
        year={year}
        onNext={handleGoToNextMonth}
        onPrevious={handleGoToPreviousMonth}
      />

      <CalendarCells
        month={month}
        year={year}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
    </div>
  )
}

export default DateSelect
