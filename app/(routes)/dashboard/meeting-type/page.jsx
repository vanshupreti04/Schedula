import { Input } from '@/components/ui/input'
import React from 'react'
import MeetingEventList from './_components/MeetingEventList'

function MeetingType() {
  return (
    <div className='p-5'>
      <div className='flex flex-col gap-5'>
        <h2 className='text-3xl font-bold text-white'>Meeting Event Type</h2>
        <Input placeholder="Search" className="max-w-xs" />
        <hr className='border-t border-[#86C232]' />
      </div>
      <MeetingEventList />
    </div>
  )
}

export default MeetingType
