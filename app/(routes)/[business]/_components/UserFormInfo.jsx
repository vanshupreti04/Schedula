import { Input } from '@/components/ui/input'
import React from 'react'

function UserFormInfo({ setUserName, setUserEmail, setUserNote }) {
  return (
    <div className='flex flex-col gap-3 p-4 px-8'>
      <h2 className='text-xl font-bold text-white'>Enter Details</h2>
      
      <div>
        <h2 className='text-gray-500'>Name *</h2>
        <Input onChange={(event) => setUserName(event.target.value)} />
      </div>
      
      <div>
        <h2 className='text-gray-500'>Email *</h2>
        <Input onChange={(event) => setUserEmail(event.target.value)} />
      </div>
      
      <div>
        <h2 className='text-gray-500'>Share any Notes</h2>
        <Input onChange={(event) => setUserNote(event.target.value)} />
      </div>
      
      <div>
        <h2 className='text-xs text-gray-400'>
          By Proceeding, you confirm that you read and agree to Tubeguruji terms and conditions.
        </h2>
      </div>
    </div>
  )
}

export default UserFormInfo
