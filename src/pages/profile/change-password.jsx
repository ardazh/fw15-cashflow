import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

import {AiOutlineLock} from 'react-icons/ai'

function ChangePassword() {
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
                <div className='font-bold text-lg text-[#3A3D42] mb-[25px]'>Change Password</div>
                <div className='text-[#7A7886] mb-[100px]'>
                    You must enter your current password and then<br/>type your new password twice.
                </div>
                <dir className='flex flex-col justify-center items-center gap-[60px]'>
                    <div className='flex gap-3 items-center py-2 border-b-2 w-[431px] '>
                        <AiOutlineLock size={24} />
                        <input className='ipnut outline-none' type="text" placeholder='Current password' />
                    </div>
                    <div className='flex gap-3 items-center py-2 border-b-2 w-[431px] '>
                        <AiOutlineLock size={24} />
                        <input className='ipnut outline-none' type="text" placeholder='New password' />
                    </div>
                    <div className='flex gap-3 items-center py-2 border-b-2 w-[431px] '>
                        <AiOutlineLock size={24} />
                        <input className='ipnut outline-none' type="text" placeholder='Repeat New password' />
                    </div>
                    <div className='flex justify-center items-center w-[431px]'>
                        <button className='btn btn-info w-full normal-case text-[#88888F] hover:text-black'>Change Password</button>
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

export default ChangePassword
