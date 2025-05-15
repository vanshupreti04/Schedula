import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function PreviewMeeting({ formValue }) {

    const [date, setDate] = useState(new Date())
    const [timeSlots, setTimeSlots] = useState();

    useEffect(() => {
        formValue?.duration && createTimeSlot(formValue?.duration)
    }, [formValue])

    /**
     * Used to create timeslot depends on interval
     * @param {*} interval 
     */
    const createTimeSlot = (interval) => {
        const startTime = 8 * 60; // 8 AM in minutes
        const endTime = 22 * 60; // 10 PM in minutes
        const totalSlots = (endTime - startTime) / interval;
        const slots = Array.from({ length: totalSlots }, (_, i) => {
            const totalMinutes = startTime + i * interval;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
            const period = hours >= 12 ? 'PM' : 'AM';
            return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
        });

        setTimeSlots(slots);
    }

    return (
        <div className='p-5 py-10 m-5 border-t-8 shadow-lg'
            style={{ borderTopColor: formValue?.themeColor }}
        >
            <Image src='/logo.png' alt='logo' width={150} height={150} />
            <div className='grid grid-cols-1 mt-5 md:grid-cols-3'>
                {/* Meeting Info */}
                <div className='p-4 border-r'>
                    <h2 className='text-white'>Business Name</h2>
                    <h2 className='text-3xl font-bold'
                        style={{ color: formValue?.themeColor }}>
                        {formValue?.eventName ? formValue?.eventName : 'Meeting Name'}
                    </h2>
                    <div className='flex flex-col gap-4 mt-5'>
                        <h2 className='flex gap-2 text-white'>
                            <Clock color={formValue?.themeColor} /> {formValue?.duration} Min
                        </h2>
                        <h2 className='flex gap-2 text-white'>
                            <MapPin color={formValue?.themeColor} /> {formValue?.locationType} Meeting
                        </h2>
                        <Link href={'#'} className='text-primary'>
                            {formValue?.locationUrl}
                        </Link>
                    </div>
                </div>
                {/* Time & Date Selection */}
                <div className='flex px-4 md:col-span-2'>
                    <div className='flex flex-col'>
                        <h2 className='text-lg font-bold text-white'>Select Date & Time</h2>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="mt-5 border rounded-md"
                            disabled={(date) => date <= new Date()}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 p-5 overflow-auto'
                        style={{ maxHeight: '400px' }}
                    >
                        {timeSlots?.map((time, index) => (
                            <Button key={index} className="border-primary text-primary" variant="outline">{time}</Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewMeeting;
