import React from 'react'

import {RxDashboard} from 'react-icons/rx'
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

function Aside() {
  return (
    <aside className='text-[#3A3D42CC] text-lg font-bold w-[270px] h-[678px] border rounded-xl shadow-lg bg-[#FFFFFF] ml-[150px] my-[40px] py-[40px]'>
          <div className='flex flex-col gap-[52px] mb-[286px] w-full'>
            <div className='flex items-center text-primary border-l-4 border-primary gap-[23px] w-full px-[35px] h-9'>
              <i>
                <RxDashboard size={28} /> 
              </i>
              <div className=''>Dashboard</div>
            </div>
            <div className='flex items-center gap-[23px] px-[35px] h-9'>
              <i>
                <AiOutlineArrowUp size={28} /> 
              </i>
              <div className=''>Transfer</div>
            </div>
            <div className='flex items-center gap-[23px] px-[35px] h-9'>
              <i>
                <AiOutlinePlus size={28} /> 
              </i>
              <div className=''>Top Up</div>
            </div>
            <div className='flex items-center gap-[23px] px-[35px] h-9'>
              <i>
                <AiOutlineUser size={28} /> 
              </i>
              <div className=''>Profile</div>
            </div>
          </div>
          <div className='flex items-center gap-[23px] px-[35px] h-9'>
              <i>
                <FiLogOut size={28} /> 
              </i>
              <div className=''>Profile</div>
            </div>
        </aside>
  )
}

export default Aside
