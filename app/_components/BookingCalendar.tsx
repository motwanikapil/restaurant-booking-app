// @ts-nocheck
'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { roundToNearestMinutes } from 'date-fns'
import Button from './Button'

export default function BookingCalendar({
  dateAndTime,
  setDateAndTime,
}: {
  dateAndTime: Date
  setDateAndTime: any
}) {
  const [tempDate, setTempDate] = useState(dateAndTime) // Temporary date state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false) // Control DatePicker visibility

  useEffect(() => {
    const roundedDate = roundToNearestMinutes(new Date(), { nearestTo: 30 })
    setTempDate(roundedDate)
    setDateAndTime(roundedDate)
  }, [])

  const handleConfirm = () => {
    setDateAndTime(tempDate)
    setIsDatePickerOpen(false)
  }

  const handleDateClick = () => {
    setIsDatePickerOpen(true)
  }

  return (
    <main className='flex flex-col items-center justify-center mt-4'>
      <DatePicker
        selected={tempDate}
        onChange={(date) => setTempDate(date ?? new Date())}
        showTimeSelect
        dateFormat='dd/MM/yyyy HH:mm'
        timeIntervals={30}
        className='border-2 border-gray-300 px-4 py-2 rounded'
        open={isDatePickerOpen}
        onClickOutside={() => setIsDatePickerOpen(false)}
        onInputClick={handleDateClick}
      />
      <Button onClick={handleConfirm}>OK</Button>
    </main>
  )
}
