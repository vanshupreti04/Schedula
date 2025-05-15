"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import Link from 'next/link'
import ThemeOptions from '@/app/_utils/ThemeOptions'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function MeetingForm({ setFormValue }) {
    const [location, setLocation] = useState();
    const [themeColor, setThemeColor] = useState('');
    const [eventName, setEventName] = useState();
    const [duration, setDuration] = useState(30);
    const [locationType, setLocationType] = useState();
    const [locationUrl, setLocationUrl] = useState();
    const { user } = useKindeBrowserClient();
    const db = getFirestore(app);
    const router = useRouter();

    useEffect(() => {
        setFormValue({
            eventName: eventName,
            duration: duration,
            locationType: locationType,
            locationUrl: locationUrl,
            themeColor: themeColor
        })
    }, [eventName, duration, locationType, locationUrl, themeColor])

    /**
     * On Create Click Handler
     */
    const onCreateClick = async () => {
        const id = Date.now().toString();
        await setDoc(doc(db, 'MeetingEvent', id), {
            id: id,
            eventName: eventName,
            duration: duration,
            locationType: locationType,
            locationUrl: locationUrl,
            themeColor: themeColor,
            businessId: doc(db, 'Business', user?.email),
            createdBy: user?.email
        })
        toast('New Meeting Event Created!');
        router.replace('/dashboard/meeting-type')
    }

    return (
        <div className='p-8'>
            <Link href={'/dashboard'}>
                <h2 className='flex gap-2 text-white'>
                    <ChevronLeft /> <span className='text-green-500'>Cancel</span>
                </h2>
            </Link>
            <div className='mt-4'>
                <h2 className='my-4 text-2xl font-bold text-white'>Create New Event</h2>
                <hr className='border-t-2 border-green-500' />
            </div>
            <div className='flex flex-col gap-3 my-4'>
                <h2 className='font-bold text-white'>Event Name *</h2>
                <Input
                    placeholder="Name of your meeting event"
                    onChange={(event) => setEventName(event.target.value)}
                    className="text-white bg-gray-500"
                />

                <h2 className='font-bold text-white'>Duration *</h2>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-white bg-gray-500 max-w-40">{duration} Min</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setDuration(15)}>15 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(30)}>30 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(45)}>45 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(60)}>60 Min</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <h2 className='font-bold text-white'>Location *</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {LocationOption.map((option, index) => (
                        <div key={index} 
                            className={`border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer 
                            ${locationType == option.name ? 'bg-blue-100 border-primary' : 'hover:bg-gray-300'} 
                            hover:border-primary`}
                            onClick={() => setLocationType(option.name)}
                        >
                            <Image src={option.icon} width={30} height={30} alt={option.name} className="text-white" />
                            <h2 className={`text-white ${locationType == option.name ? 'text-black' : 'text-white'}`}>
                                {option.name}
                            </h2>
                        </div>
                    ))}
                </div>

                {locationType && <>
                    <h2 className='font-bold text-white'>Add {location} Url *</h2>
                    <Input
                        placeholder='Add Url'
                        onChange={(event) => setLocationUrl(event.target.value)}
                        className="text-white bg-gray-500"
                    />
                </>}

                <h2 className='font-bold text-white'>Select Theme Color</h2>
                <div className='flex justify-evenly'>
                    {ThemeOptions.map((color, index) => (
                        <div key={index} className={`h-7 w-7 rounded-full ${themeColor == color && ' border-4 border-black'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setThemeColor(color)}
                        >
                        </div>
                    ))}
                </div>
            </div>

            <Button
                className="w-full bg-green-500 mt-9"
                disabled={(!eventName || !duration || !locationType || !locationUrl)}
                onClick={() => onCreateClick()}
            >
                Create
            </Button>
        </div>
    )
}

export default MeetingForm;
