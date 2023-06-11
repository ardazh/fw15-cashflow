import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

import Image from 'next/image'
import banner from '../../assets/banner.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import BannerAuth from '@/components/BannerAuth'
    

function CreatePin() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);


  return (
    <div className='flex'>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
            <BannerAuth />
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <form className='w-[80%] flex flex-col justify-center'>
            <div className='flex flex-col gap-7'>
              <div className='text-2xl text-[#3A3D42] font-bold'>
                Secure Your Account, Your Wallet,
                and Your Data With 6 Digits PIN
                That You Created Yourself.
              </div>
              <div className='text-base text-[#3A3D4] mb-12'>
                Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don&apos;t tell anyone about your FazzPay account password and the PIN.
              </div>
            </div>
            <div className="w-full">
                <div className="flex gap-4">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded-md outline-none"
                    />
                  ))}
                </div>
                <div className="w-full pt-12">
                  <button type="submit" className="btn btn-secondary text-white normal-case w-full">
                    Confirm
                  </button>
                </div>
            </div>
        </form>
        </div>
    </div>
  )
}

export default CreatePin
