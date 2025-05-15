"use client"
import { Button } from '@/components/ui/button';
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getFirestore, collection, query, where, getDocs, orderBy, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { Clock, Copy, MapPin, Pen, Settings, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [businessInfo, setBusinessInfo] = useState();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    user && getEventList();
    user && BusinessInfo();
  }, [user]);

  const getEventList = async () => {
    setEventList([]);
    const q = query(collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email),
      orderBy('id', 'desc'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEventList(prevEvent => [...prevEvent, doc.data()]);
    });
  }

  const BusinessInfo = async () => {
    const docRef = doc(db, 'Business', user.email);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  }

  const onDeleteMeetingEvent = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then(() => {
      toast('Meeting Event Deleted!');
      getEventList();
    });
  }

  const onCopyClickHandler = (event) => {
    const meetingEventUrl = process.env.NEXT_PUBLIC_BASE_URL + '/' + businessInfo.businessName + '/' + event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast('Copied to Clipboard');
  }

  return (
    <div className='grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-7'>
      {eventList.length > 0 ? eventList?.map((event, index) => (
        <div
          key={index}
          className='flex flex-col gap-3 p-5 border border-t-8 rounded-lg shadow-md'
          style={{ borderTopColor: event?.themeColor }}
        >
          <div className='flex justify-end'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Settings className='cursor-pointer text-[#86C232]' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2">
                  <Pen /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => onDeleteMeetingEvent(event)}
                >
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h2 className="text-xl font-semibold text-[#E0E1DD]">{event?.eventName}</h2>

          <div className='flex justify-between'>
            <h2 className='flex gap-2 text-[#A5A5A5] items-center'><Clock className='w-4 h-4' /> {event.duration} Min</h2>
            <h2 className='flex gap-2 text-[#A5A5A5] items-center'><MapPin className='w-4 h-4' /> {event.locationType}</h2>
          </div>

          <hr className='border-t border-[#86C232]' />

          <div className='flex items-center justify-between'>
            <h2
              className='flex items-center gap-2 text-sm cursor-pointer text-[#86C5FF]'
              onClick={() => onCopyClickHandler(event)}
            >
              <Copy className='w-4 h-4' /> Copy Link
            </h2>

            <Button
              className="text-white transition bg-black border border-white rounded-full hover:bg-white hover:text-black"
            >
              Share
            </Button>
          </div>
        </div>
      )) : (
        <h2 className='text-white'>Loading...</h2>
      )}
    </div>
  );
}

export default MeetingEventList;
