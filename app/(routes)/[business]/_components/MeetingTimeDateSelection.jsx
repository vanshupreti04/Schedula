import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TimeDateSelection from './TimeDateSelection'
import UserFormInfo from './UserFormInfo'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Plunk from '@plunk/node'
import { render } from '@react-email/render';
import Email from '@/emails'

function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
  const [date, setDate] = useState(new Date())
  const [timeSlots, setTimeSlots] = useState()
  const [enableTimeSlot, setEnabledTimeSlot] = useState(false)
  const [selectedTime, setSelectedTime] = useState()
  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userNote, setUserNote] = useState('')
  const [prevBooking, setPrevBooking] = useState([])
  const [step, setStep] = useState(1)
  const router = useRouter()
  const db = getFirestore(app)
  const [loading, setLoading] = useState(false)
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY)

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration)
  }, [eventInfo])

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60
    const endTime = 22 * 60
    const totalSlots = (endTime - startTime) / interval
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      const formattedHours = hours > 12 ? hours - 12 : hours
      const period = hours >= 12 ? 'PM' : 'AM'
      return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`
    })
    setTimeSlots(slots)
  }

  const handleDateChange = (newDate) => {
    if (!newDate || isNaN(new Date(newDate).getTime())) return
    setDate(new Date(newDate))
    const day = format(new Date(newDate), 'EEEE')
    if (businessInfo?.daysAvailable?.[day]) {
      getPrevEventBooking(new Date(newDate))
      setEnabledTimeSlot(true)
    } else {
      setEnabledTimeSlot(false)
    }
  }

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!regex.test(userEmail)) {
      toast('Enter valid email address')
      return
    }
    const docId = Date.now().toString()
    setLoading(true)
    await setDoc(doc(db, 'ScheduledMeetings', docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: format(date, 'yyyy-MM-dd'),
      formatedDate: format(date, 'PPP'),
      formatedTimeStamp: format(date, 't'),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then((resp) => {
      toast('Meeting Scheduled successfully!')
      sendEmail(userName)
    })
  }

  const sendEmail = (user) => {
    if (!userEmail || typeof userEmail !== 'string') {
      setLoading(false)
      toast('Invalid email address.')
      return
    }

    const emailHtml = render(
      <Email
        businessName={businessInfo?.businessName}
        date={format(date, 'PPP').toString()}
        duration={eventInfo?.duration}
        meetingTime={selectedTime}
        meetingUrl={eventInfo.locationUrl}
        userFirstName={user}
      />
    )

    plunk.emails
      .send({
        to: userEmail,
        subject: 'Meeting Schedule Details',
        body: emailHtml,
      })
      .then((resp) => {
        setLoading(false)
        router.replace('/confirmation')
      })
      .catch((error) => {
        setLoading(false)
        toast('Error sending email')
      })
  }

  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, 'ScheduledMeetings'),
      where('selectedDate', '==', date_),
      where('eventId', '==', eventInfo.id)
    )

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setPrevBooking((prev) => [...prev, doc.data()])
    })
  }

  return (
    <div
      className='p-5 py-10 m-5 mx-10 my-10 border-t-8 shadow-lg md:mx-26 lg:mx-56'
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src='/logo.png' alt='logo' width={150} height={150} />
      <div className='grid grid-cols-1 mt-5 md:grid-cols-3'>
        {/* Meeting Info */}
        <div className='p-4 border-r'>
          <h2 className='mb-4 text-white'>{businessInfo?.businessName}</h2>
          <h2 className='text-3xl font-bold' style={{ color: eventInfo?.themeColor }}>
            {eventInfo?.eventName ? eventInfo?.eventName : 'Meeting Name'}
          </h2>
          <div className='flex flex-col gap-4 mt-5 text-white'>
            <h2 className='flex items-center gap-2'>
              <Clock color={eventInfo?.themeColor} />
              {eventInfo?.duration} Min
            </h2>
            <h2 className='flex items-center gap-2'>
              <MapPin color={eventInfo?.themeColor} />
              {eventInfo?.locationType} Meeting
            </h2>
            <h2 className='flex items-center gap-2'>
              <CalendarCheck color={eventInfo?.themeColor} />
              {format(date, 'PPP')}
            </h2>
            {selectedTime && (
              <h2 className='flex items-center gap-2'>
                <Timer color={eventInfo?.themeColor} />
                {selectedTime}
              </h2>
            )}
            {eventInfo?.locationUrl && (
              <Link href={eventInfo.locationUrl} className='text-primary'>
                {eventInfo.locationUrl}
              </Link>
            )}
          </div>
        </div>

        {/* Time & Date Selection */}
        {step == 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>

      <div className='flex justify-end gap-3 mt-4'>
        {step == 2 && (
          <Button variant='outline' onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className='mt-10'
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button disabled={!userEmail || !userName} onClick={handleScheduleEvent}>
            {loading ? <LoaderIcon className='animate-spin' /> : 'Schedule'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default MeetingTimeDateSelection
