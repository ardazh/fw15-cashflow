import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

import Image from 'next/image'
import profile from '../../assets/profile1.jpg'
import {LuEdit2, LuArrowRight} from 'react-icons/lu'


function Profile() {
  return (
    <main className='bg-[#E5E5E5]'>
        <div>
            <Headers />
        </div>
        <div className='flex'>
            <div>
                <Aside />
            </div>
            <div className='flex flex-col gap-10 bg-[#FFFFFF] shadow-xl rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10'>
                <div className='flex flex-col items-center'>
                    <div className='border w-20 h-20 rounded-xl overflow-hidden object-cover mb-2.5'>
                        <Image className='' src={profile} alt='profile.jpg' width={80} height={80} />
                    </div>
                    <div className='flex items-center gap-3 text-[#7A7886] mb-[15px]'>
                        <i>
                            <LuEdit2 />
                        </i>
                        <div>Edit</div>
                    </div>
                    <div className='flex flex-col justify-center items-center text-[#3A3D42] gap-2.5 mb-[50px]'>
                        <div className='text-lg font-bold'>Kim Jisoo</div>
                        <div className='text-[13px]'>+62 8139 3877 7946</div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] '>
                            Personal Information
                            <i>
                                <LuArrowRight size={28}/>
                            </i>
                        </div>
                        <div className='flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] '>
                            Change Password
                            <i>
                                <LuArrowRight size={28}/>
                            </i>
                        </div>
                        <div className='flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] '>
                            Change PIN
                            <i>
                                <LuArrowRight size={28}/>
                            </i>
                        </div>
                        <div className='flex justify-between items-center bg-[#E5E8ED] w-[433px] h-[64px] border rounded-xl font-bold text-[#4D4B57] px-5 py-[18px] '>
                            Logout
                        </div>
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

export default Profile
