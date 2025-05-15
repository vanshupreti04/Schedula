import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

function TimeDateSelection({ date, handleDateChange, timeSlots, setSelectedTime, enableTimeSlot, selectedTime, prevBooking }) {

  /**
   * Used to check timeslot whether it's already booked or not
   * @param {*} time 
   * @returns Boolean
   */
  const checkTimeSlot = (time) => {
    return (prevBooking.filter(item => item.selectedTime == time)).length > 0
  }

  return (
    <div className='flex px-4 md:col-span-2'>
      <div className='flex flex-col'>
        <h2 className='text-lg font-bold text-white'>Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="mt-5 border rounded-md"
          disabled={(date) => date <= new Date()}
        />
      </div>
      <div
        className='flex flex-col w-full gap-4 p-5 overflow-auto'
        style={{ maxHeight: '400px' }}
      >
        {timeSlots?.map((time, index) => (
          <Button
            key={index}
            disabled={!enableTimeSlot || checkTimeSlot(time)}
            onClick={() => setSelectedTime(time)}
            className={`border-primary text-primary ${
              time == selectedTime && 'bg-primary text-white'
            }`}
            variant="outline"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default TimeDateSelection
