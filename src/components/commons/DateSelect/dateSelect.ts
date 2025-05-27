import { DateTime } from 'luxon'

type CellInfo = {
  dateTime: DateTime
  isSelected: boolean
  isToday: boolean
  isMonth: boolean
  isAfterOneWeek: boolean
  isSunday: boolean
}

type MonthDayCounter = {
  previous: number
  current: number
  next: number
}

export const DATE_SELECT_FORMAT = 'dd-MM-yyyy'

export class DatePickerHandler {
  private month: number
  private year: number
  private selectedDate: string
  private today: DateTime
  private previousMonth: DateTime
  private nextMonth: DateTime
  private monthDayCounter: MonthDayCounter

  constructor(month: number, year: number, selectedDate: string) {
    this.month = month // January is 1
    this.year = year
    this.selectedDate = selectedDate
    this.today = DateTime.now()
    this.previousMonth = this.getPreviousMonth(this.month - 1)
    this.nextMonth = this.getNextMonth(this.month + 1)
    this.monthDayCounter = this.initMonthDayCounter()
  }

  getNextMonth(nextMonth: number) {
    if (nextMonth > 12) {
      return DateTime.local(this.year + 1, 1, 1)
    }
    return DateTime.local(this.year, nextMonth, 1)
  }

  getPreviousMonth(previousMonth: number) {
    if (previousMonth < 1) {
      return DateTime.local(this.year - 1, 12, 1)
    }
    return DateTime.local(this.year, previousMonth, 1)
  }

  initMonthDayCounter() {
    const firstDayOfWeekOfMonth = new Date(
      this.year,
      this.month - 1,
      1
    ).getDay() // Sunday is 0
    return {
      previous: this.previousMonth.daysInMonth! - firstDayOfWeekOfMonth + 1,
      current: 1,
      next: 1,
    }
  }

  getCellDateTime() {
    let cellDateTime: DateTime

    if (this.monthDayCounter.previous <= this.previousMonth.daysInMonth!) {
      cellDateTime = DateTime.local(
        this.previousMonth.year,
        this.previousMonth.month,
        this.monthDayCounter.previous
      )
      this.monthDayCounter.previous++
    } else if (
      this.monthDayCounter.current <=
      DateTime.local(this.year, this.month, 1).daysInMonth!
    ) {
      cellDateTime = DateTime.local(
        this.year,
        this.month,
        this.monthDayCounter.current
      )
      this.monthDayCounter.current++
    } else {
      cellDateTime = DateTime.local(
        this.nextMonth.year,
        this.nextMonth.month,
        this.monthDayCounter.next
      )
      this.monthDayCounter.next++
    }

    return cellDateTime
  }

  get cells() {
    const cells: Array<Array<CellInfo>> = []

    // 6 by 7 2D array
    for (let i = 0; i < 6; i++) {
      cells.push([])
      for (let j = 0; j < 7; j++) {
        const cellDateTime = this.getCellDateTime()
        cells[i].push({
          dateTime: cellDateTime,
          isSelected:
            this.selectedDate === cellDateTime.toFormat(DATE_SELECT_FORMAT),
          isToday:
            this.today.toFormat(DATE_SELECT_FORMAT) ===
            cellDateTime.toFormat(DATE_SELECT_FORMAT),
          isMonth: cellDateTime.month === this.month,
          isSunday: cellDateTime.weekday === 7,
          isAfterOneWeek: cellDateTime >= this.today.plus({ days: 7 }),
        })
      }
    }

    return cells
  }
}
