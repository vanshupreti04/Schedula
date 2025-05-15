"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <>
      <style jsx>{`
        .flip-wrapper {
          perspective: 1000px;
        }
        .flip-card {
          position: relative;
          width: 100px;
          height: 30px;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        .flip-wrapper:hover .flip-card {
          transform: rotateX(180deg);
        }
        .flip-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flip-front {
          color: #E0E1DD;
        }
        .flip-back {
          transform: rotateX(180deg);
          color: #86C232;
          font-weight: bold;
        }
      `}</style>

      <div className="bg-[#222629] text-[#E0E1DD] shadow-md">
        <div className='flex items-center justify-between px-6 py-4'>
          <Image 
            src='/logo.png' 
            width={100} 
            height={100} 
            alt='logo'
            className='w-[150px] md:w-[200px]' // <-- removed grayscale and hover
          />
          
          <ul className='hidden gap-12 text-lg font-medium md:flex'>
            {["Product", "Pricing", "Contact us", "About Us"].map((item, index) => (
              <li key={index} className='flip-wrapper cursor-pointer w-[100px] h-[30px]'>
                <div className="flip-card">
                  <div className="flip-face flip-front">{item}</div>
                  <div className="flip-face flip-back">{item}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className='flex gap-3'>
            <LoginLink>
              <Button
                variant="ghost"
                className='bg-white text-black border border-[#86C232] px-5 py-2 rounded-2xl hover:bg-[#61892F] hover:text-white transition duration-300'
              >
                Login
              </Button>
            </LoginLink>

            <RegisterLink>
              <Button
                className='bg-[#86C232] text-black px-5 py-2 rounded-2xl hover:bg-white hover:text-[#222629] transition duration-300'
              >
                Get Started
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
