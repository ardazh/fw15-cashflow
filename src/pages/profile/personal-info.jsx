import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

import Link from 'next/link'

function PersonaInfo() {
  return (
    <main className='bg-[#E5E5E5]'>
        <div>
            <Headers />
        </div>
        <div className='flex'>
            <div>
                <Aside />
            </div>
            <div className='flex flex-col bg-[#FFFFFF] shadow-xl rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10'>
                <div className='font-bold text-lg text-[#3A3D42] mb-[25px]'>Personal Information</div>
                <div className='text-[#7A7886] mb-10'>
                    We got your personal information from the sign<br/>up proccess. If you want to make changes on<br/>your information, contact our support.
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg'>
                        <div className='text-[#7A7886]'>First Name</div>
                        <div className='text-[#514F5B] font-bold text-lg'>Jisoo</div>
                    </div>
                    <div className='flex flex-col w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg'>
                        <div className='text-[#7A7886]'>Last Name</div>
                        <div className='text-[#514F5B] font-bold text-lg'>Kim</div>
                    </div>
                    <div className='flex flex-col w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg'>
                        <div className='text-[#7A7886]'>Verified E-mail</div>
                        <div className='text-[#514F5B] font-bold text-lg'>jisoo@gmail.com</div>
                    </div>
                    <div className='flex justify-between items-center w-[790px] h-[92px] p-[15px] border border-none rounded-xl shadow-lg'>
                        <div className='flex flex-col'>
                            <div className='text-[#7A7886]'>Phone Number</div>
                            <div className='text-[#514F5B] font-bold text-lg'>+62 813-9387-7946</div>
                        </div>
                        <Link href='/profile/change-number'>
                            <div className='font-medium text-primary hover:text-lg'>Manage</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Footers />
        </div>
    </main>
  )
}

export default PersonaInfo
