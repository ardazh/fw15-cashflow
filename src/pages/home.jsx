import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

import Link from 'next/link'
import Image from 'next/image'
import graphic from '../assets/graphic.png'
import profile5 from '../assets/profile5.png'
import {AiOutlineArrowUp, AiOutlineArrowDown, AiOutlinePlus} from 'react-icons/ai'

function Home() {
  return (
    <main className='bg-[#E5E5E5]'>
        <div>
            <Headers />
        </div>
        <div className='flex'>
          <div>
            <Aside />
          </div>
          <div>
            <div className='flex justify-between bg-primary border rounded-xl shadow-xl w-[850px] h-[190px] mt-[40px] ml-5 py-[30px] px-[30px]'>
              <div className='flex flex-col'>
                <div className='text-lg text-[#E0E0E0] mb-2.5'>Balance</div>
                <div className='text-4xl font-bold text-[#FFFFFF] mb-[15px]'>Rp120.000</div>
                <div className='text-sm font-semibold'>+62 813-9387-7946</div>
              </div>
              <div className='flex flex-col gap-4'>
                  <button className='btn btn-secondary text-[#FFFFFF] normal-case font-bold text-lg'>
                    <i>
                      <AiOutlineArrowUp size={28} />
                    </i>
                    Transfer
                  </button>
                  <button className='btn btn-secondary text-[#FFFFFF] normal-case font-bold text-lg'>
                    <i>
                      <AiOutlinePlus size={28} />
                    </i>
                    Top Up
                  </button>
                </div>
            </div>
            <div className='flex'>
              <div className='bg-[#FFFFFF] w-[463px] h-[468px] rounded-xl shadow-xl px-[30px] py-[30px] ml-5 mt-5'>
                <div className='flex justify-between mb-[50px]'>
                  <div className='flex flex-col gap-2.5'>
                    <i>
                      <AiOutlineArrowDown className='text-[#1EC15F]' size={28} />
                    </i>
                    <div className='text-[#6A6A6A] '>Income</div>
                    <div className='text-[#3A3D42] text-lg font-bold'>Rp2.120.000</div>
                  </div>
                  <div className='flex flex-col gap-2.5'>
                    <i>
                      <AiOutlineArrowUp className='text-[#FF5B37]' size={28} />
                    </i>
                    <div className='text-[#6A6A6A] '>Expense</div>
                    <div className='text-[#3A3D42] text-lg font-bold'>Rp1.560.000</div>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <Image src={graphic} alt='grapic.png' />
                </div>
              </div>
              <div className='flex flex-col gap-10 bg-[#FFFFFF] rounded-xl w-[367px] h-[468px] px-[30px] py-[30px] ml-5 mt-5'>
                <div className='flex justify-between items-center pr-2'>
                  <div className='font-bold text-lg text-[#3A3D42]'>Transaction History</div>
                  <div className='font-semibold text-sm text-primary hover:text-base'>
                    <Link href='/history'>See All</Link>
                  </div>
                </div>
                <div className='flex flex-col gap-10'>
                  <div className='flex'>
                    <div className='mr-[15px]'>
                      <Image src={profile5} alt='profile5.png' />
                    </div>
                    <div className='flex flex-col gap-[9px] mr-[59px]'>
                      <div className='font-bold text-[#4D4B57]'>Samuel Suhi</div>
                      <div className='text-sm text-[#7A7886]'>Accept</div>
                    </div>
                    <div className='flex items-center text-bold text-[#1EC15F]'>+Rp50.000</div>
                  </div>
                  <div className='flex'>
                    <div className='mr-[15px]'>
                      <Image src={profile5} alt='profile5.png' />
                    </div>
                    <div className='flex flex-col gap-[9px] mr-[59px]'>
                      <div className='font-bold text-[#4D4B57]'>Samuel Suhi</div>
                      <div className='text-sm text-[#7A7886]'>Accept</div>
                    </div>
                    <div className='flex items-center text-bold text-[#1EC15F]'>+Rp50.000</div>
                  </div>
                  <div className='flex'>
                    <div className='mr-[15px]'>
                      <Image src={profile5} alt='profile5.png' />
                    </div>
                    <div className='flex flex-col gap-[9px] mr-[59px]'>
                      <div className='font-bold text-[#4D4B57]'>Samuel Suhi</div>
                      <div className='text-sm text-[#7A7886]'>Accept</div>
                    </div>
                    <div className='flex items-center text-bold text-[#1EC15F]'>+Rp50.000</div>
                  </div>
                  <div className='flex'>
                    <div className='mr-[15px]'>
                      <Image src={profile5} alt='profile5.png' />
                    </div>
                    <div className='flex flex-col gap-[9px] mr-[59px]'>
                      <div className='font-bold text-[#4D4B57]'>Samuel Suhi</div>
                      <div className='text-sm text-[#7A7886]'>Accept</div>
                    </div>
                    <div className='flex items-center text-bold text-[#1EC15F]'>+Rp50.000</div>
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

export default Home
