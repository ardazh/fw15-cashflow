import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

import Image from 'next/image'
import profile5 from '../assets/profile5.png'
import {AiOutlineSearch} from 'react-icons/ai'
    
    function Transfer() {
      return (
        <main className='bg-[#E5E5E5]'>
            <div>
                <Headers />
            </div>
            <div className='flex'>
                <div>
                    <Aside />
                </div>
                <div className='flex flex-col gap-10 bg-[#FFFFFF] rounded-xl w-[850px] h-[678px] px-[30px] py-[30px] ml-5 mt-10'>
                    <div className='flex flex-col gap-[25px] w-[790px]'>
                        <div className='font-bold text-lg text-[#3A3D42]'>Search Receiver</div>
                        <div className='h-14 w-full flex items-center gap-2 border-2 rounded-xl mb-[50px]'>
                            <i className='pl-5'>
                                <AiOutlineSearch size={24} />
                            </i>
                            <div>
                                <input type='text' name='searchName' className="outline-none w-full" placeholder='Search receiver here' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[40px]'>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <div className='mr-[15px]'>
                                    <Image className='w-[70px] h-[70px]' src={profile5} alt='profile5.png' />
                                </div>
                                <div className='flex flex-col gap-[9px] mr-[59px]'>
                                    <div className='font-bold text-lg text-[#4D4B57]'>Samuel Suhi</div>
                                    <div className='text-[#7A7886]'>+62 813-8492-9994</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <div className='mr-[15px]'>
                                    <Image className='w-[70px] h-[70px]' src={profile5} alt='profile5.png' />
                                </div>
                                <div className='flex flex-col gap-[9px] mr-[59px]'>
                                    <div className='font-bold text-lg text-[#4D4B57]'>Samuel Suhi</div>
                                    <div className='text-[#7A7886]'>+62 813-8492-9994</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <div className='mr-[15px]'>
                                    <Image className='w-[70px] h-[70px]' src={profile5} alt='profile5.png' />
                                </div>
                                <div className='flex flex-col gap-[9px] mr-[59px]'>
                                    <div className='font-bold text-lg text-[#4D4B57]'>Samuel Suhi</div>
                                    <div className='text-[#7A7886]'>+62 813-8492-9994</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <div className='mr-[15px]'>
                                    <Image className='w-[70px] h-[70px]' src={profile5} alt='profile5.png' />
                                </div>
                                <div className='flex flex-col gap-[9px] mr-[59px]'>
                                    <div className='font-bold text-lg text-[#4D4B57]'>Samuel Suhi</div>
                                    <div className='text-[#7A7886]'>+62 813-8492-9994</div>
                                </div>
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
    
    export default Transfer
    