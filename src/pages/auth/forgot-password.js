import React from 'react'
import Link from 'next/link'

import Image from 'next/image'
import banner from '../../assets/banner.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import BannerAuth from '@/components/BannerAuth'

function ForgotPassword() {
  return (
    <div className='flex'>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
            <BannerAuth />
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <form className='w-[80%] flex flex-col justify-center'>
            <div className='flex flex-col gap-7'>
              <div className='text-2xl text-[#3A3D42] font-bold'>
                Did You Forgot Your Password?
                Don&apos;t Worry, You Can Reset Your
                Password In a Minutes.
              </div>
              <div className='text-base text-[#3A3D4]'>
              To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
              </div>
            </div>
            <div className='flex flex-col mt-16 gap-14'>
                <div className='flex items-center gap-3 border-b-2'>
                  <i>
                    <AiOutlineMail />
                  </i>
                  <input className='input w-full outline-none border-0 hover:outline-none hover:border-0' placeholder='Enter your E-mail' />
                </div>
            </div>
            <div className='mt-[90px]'>
              <button type='submit' className='btn btn-secondary btn-block text-white'>Confirm</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default ForgotPassword
