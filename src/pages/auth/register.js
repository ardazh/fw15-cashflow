import React from 'react'
import Link from 'next/link'

import Image from 'next/image'
import banner from '../../assets/banner.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'

function Register() {
  return (
    <div className='flex'>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
            <div className=''>
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
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <form className='w-[80%] flex flex-col justify-center mt-20'>
            <div className='flex flex-col gap-7'>
              <div className='text-2xl text-[#3A3D42] font-bold'>
                Start Accessing Banking Needs
                With All Devices and All Platforms
                With 30.000+ Users
              </div>
              <div className='text-base text-[#3A3D4]'>
                Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
              </div>
            </div>
            <div className='flex flex-col mt-16'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3 border-b-2'>
                  <i>
                    <AiOutlineMail />
                  </i>
                  <input className='input w-full outline-none border-0 hover:outline-none hover:border-0' placeholder='Enter your fristname' />
                </div>
                <div className='flex items-center gap-3 border-b-2'>
                  <i>
                    <AiOutlineLock />
                  </i>
                  <input className='input w-full outline-none border-0 hover:outline-none hover:border-0' placeholder='Enter your lastname' />
                </div>
                <div className='flex items-center gap-3 border-b-2'>
                  <i>
                    <AiOutlineLock />
                  </i>
                  <input className='input w-full outline-none border-0 hover:outline-none hover:border-0' placeholder='Enter your e-mail' />
                </div>
                <div className='flex items-center gap-3 border-b-2'>
                  <i>
                    <AiOutlineLock />
                  </i>
                  <input className='input w-full outline-none border-0 hover:outline-none hover:border-0' placeholder='Enter your password' />
                </div>
              </div>
              <div className='text-primary text-right'>
                Forgot password?
              </div>
              <div className='mt-[90px]'>
                <button type='submit' className='btn btn-secondary text-white btn-block'>Sign Up</button>
              </div>
              <div className='flex justify-center mt-10'>
                Already have an account? Let&apos;s Login <Link href='' className='text-secondary'>Let&apos;s Login</Link>
              </div>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Register
