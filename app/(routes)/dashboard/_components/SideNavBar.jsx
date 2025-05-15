"use client"
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, Clock, Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function SideNavBar() {
    const menu = [
        {
            id: 1,
            name: 'Meeting Type',
            path: '/dashboard/meeting-type',
            icon: Briefcase
        },
        {
            id: 2,
            name: 'Scheduled Meeting',
            path: '/dashboard/scheduled-meeting',
            icon: Calendar
        },
        {
            id: 3,
            name: 'Availability',
            path: '/dashboard/availability',
            icon: Clock
        },
        {
            id: 4,
            name: 'Settings',
            path: '/dashboard/settings',
            icon: Settings
        },
    ]

    const path = usePathname();
    const [activePath, setActivePath] = useState(path);

    useEffect(() => {
        path && setActivePath(path)
    }, [path])

    return (
        <div className='min-h-screen p-5 border-r py-14 border-white/20' style={{ backgroundColor: '#222629' }}>
            <div className='flex justify-center'>
                <Image src='/logo.png' width={150} height={150} alt='logo' />
            </div>

            <Link href={'/create-meeting'}>
                <Button
                    className="flex w-full gap-2 rounded-full mt-7 bg-[#86C232] text-black hover:bg-[#61892F] transition"
                >
                    <Plus /> Create
                </Button>
            </Link>

            <div className='flex flex-col gap-5 mt-10'>
                {menu.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <Button
                            variant="ghost"
                            className={`w-full flex gap-2 justify-start font-normal text-lg text-[#E0E1DD] hover:text-white hover:bg-[#33393D] transition ${
                                activePath == item.path ? 'bg-[#91ba58] text-black' : ''
                            }`}
                        >
                            <item.icon /> {item.name}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNavBar
