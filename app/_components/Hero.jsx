"use client"
import { Button } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
})

function Hero() {
  return (
    <div className='w-full min-h-screen bg-[#222629] text-[#E0E1DD] px-4 relative overflow-hidden flex items-center justify-center'>
      
      {/* Decorative Profile Images */}
      <div className='hidden lg:block'>
        <div className='h-[100px] w-[100px] rounded-full bg-white flex items-center justify-center absolute right-36 top-40 shadow-lg border-4 border-[#6BA72B] animate-float-1'>
          <Image src='/meet.png' alt='profile' width={70} height={70} className='object-cover rounded-full' />
        </div>
        <div className='h-[100px] w-[100px] rounded-full bg-white flex items-center justify-center absolute top-[20%] left-12 shadow-lg border-4 border-[#6BA72B] animate-float-2'>
          <Image src='/teams.png' alt='profile' width={70} height={70} className='object-cover rounded-full' />
        </div>
        <div className='h-[100px] w-[100px] rounded-full bg-white flex items-center justify-center absolute bottom-40 left-36 shadow-lg border-4 border-[#6BA72B] animate-float-3'>
          <Image src='/zoom.png' alt='profile' width={70} height={70} className='object-cover rounded-full' />
        </div>
        <div className='h-[100px] w-[100px] rounded-full bg-white flex items-center justify-center absolute bottom-36 right-16 shadow-lg border-4 border-[#6BA72B] animate-float-4'>
          <Image src='/phone.png' alt='profile' width={70} height={70} className='object-cover rounded-full' />
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-3xl mx-auto text-center'>
        <h2 className={`font-bold text-[52px] md:text-[72px] text-[#F5F5F5] leading-tight ${playfair.variable} font-serif`}>
          Easy Scheduling Ahead
        </h2>
        <h2 className='mt-5 text-xl text-[#A5A5A5]'>
          Scheduly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.
        </h2>

        <div className='flex flex-col items-center gap-5 mt-8'>
          <h3 className='text-sm text-[#AAAAAA]'>Sign Up free with Google and Facebook</h3>

          <div className='flex flex-col justify-center gap-6 sm:flex-row'>
            <LoginLink>
              <Button className="flex items-center gap-4 px-6 py-5 bg-[#7fa854] text-black transition-all duration-200 shadow-md rounded-xl hover:bg-[#D7E9C1]">
                <Image src='/google.png' alt='google' width={30} height={30} />
                Sign up with Google
              </Button>
            </LoginLink>

            <LoginLink>
              <Button className="flex items-center gap-4 px-6 py-5 bg-[#7fa854] text-black transition-all duration-200 shadow-md rounded-xl hover:bg-[#D7E9C1]">
                <Image src='/facebook.png' alt='facebook' width={30} height={30} />
                Sign up with Facebook
              </Button>
            </LoginLink>
          </div>

          <div className='w-full max-w-md mt-6'>
            <hr className='border-[#474B4F]' />
          </div>

          <LoginLink>
            <h2 className='mt-4 text-sm'>
              <span className='text-[#6BA72B] font-semibold underline hover:text-[#A4D65E] transition'>
                Sign up Free with Email.
              </span>{' '}
              No Credit card required
            </h2>
          </LoginLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
