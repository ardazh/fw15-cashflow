import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

import {IoCallOutline} from 'react-icons/io5'


function ChangeNumber() {
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
                <div className='font-bold text-lg text-[#3A3D42] mb-[25px]'>Edit Phone Number</div>
                <div className='text-[#7A7886] mb-10'>
                    Add at least one phone number for the transfer<br/>ID so you can start transfering your money to<br/>another user.
                </div>
                <dir className='flex flex-col justify-center gap-3 items-center gap-[60px]'>
                    <div className='flex gap-3 items-center py-2 border-b-2 w-[431px] '>
                        <IoCallOutline />
                        +62
                        <input className='ipnut outline-none' type="text" placeholder='Enter your phone number' />
                    </div>
                    <div className=''>
                        <button className='btn btn-info normal-case w-[431px] text-[#88888F] hover:text-black'>Edit Phone Number</button>
                    </div>
                </dir>
            </div>
        </div>
        <div>
            <Footers />
        </div>
    </main>
  )
}

export default ChangeNumber
