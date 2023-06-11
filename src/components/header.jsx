import React from 'react'
import Image from 'next/image'
import profile from '../assets/profile1.jpg'

import {AiOutlineBell} from 'react-icons/ai'

function Header() {
  return (
    <header className='flex justify-between px-[150px] py-[50px] border-b-4 rounded-b-2xl shadow-lg bg-[#FFFFFF]'>
        <div className='font-bold text-primary text-[29px]'>CashFlow</div>
        <div className='flex items-center'>
            <div className='flex items-center justify-center border w-[52px] h-[52px] rounded-xl overflow-hidden object-cover mr-[20px]'>
                <Image className='' src={profile} alt='profile.jpg' size={52} />
            </div>
            <div className='flex flex-col text-[#3A3D42] mr-[33px]'>
                <div className='text-lg font-bold'>Kim Jisoo</div>
                <div className='text-[13px]'>+62 8139 3877 7946</div>
            </div>
            <i className='text-[#4D4B57]'>
                <AiOutlineBell size={24} />
            </i>
        </div>
    </header>
  )
}

export default Header
