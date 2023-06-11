import React from 'react'

import Image from 'next/image'
import banner from '../assets/banner.png'

function BannerAuth() {
  return (
    <div className='bg-login bg-no-repeat bg-cover'>
        <div className='flex ml-40 text-white'>CashFlow</div>
        <div className='flex justify-center items-center'>
            <Image className='w-[512px] h-[575px]' src={banner} alt='banner.png' />
        </div>
        <div className='flex flex-col justify-center mx-36 mb-16 gap-10 justify-center'>
        <div className='text-2xl font-bold'>App that Covering Banking Needs.</div>
        <div className='text-base'>
            CashFlow is an application that focussing in banking needs for all users
            in the world. Always updated and always following world trends.
            5000+ users registered in CashFlow everyday with worldwide
            users coverage.
        </div>
        </div>
    </div>
  )
}

export default BannerAuth
