import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'

function ChangePin() {
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
                <div className='font-bold text-lg text-[#3A3D42] mb-[25px]'>Change PIN</div>
                <div className='text-[#7A7886] mb-[100px]'>
                    Enter your current 6 digits Fazzpay PIN below<br/>to continue to the next steps.
                </div>
                <div className='flex flex-col gap-12 items-center pt-12 px-4'>
                    <div className='w-[400px] flex flex-col gap-6'>
                        <div className='flex gap-4 justify-between'>
                            <div>
                                <input type="number" className='w-12 h-12 text-center border border-gray-300 rounded' />
                            </div>
                            <div>
                                <input type="number" className='w-12 h-12 text-center border border-gray-300 rounded' />
                            </div>
                            <div>
                                <input type="number" className='w-12 h-12 text-center border border-gray-300 rounded' />
                            </div>
                            <div>
                                <input type="number" className='w-12 h-12 text-center border border-gray-300 rounded' />
                            </div>
                            <div>
                                <input type="number" className='w-12 h-12 text-center border border-gray-300 rounded' />
                            </div>
                            <div>
                                <input type="number" className='w-12 h-12 text-center border border-gray-300 rounded' />
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-info normal-case w-full text-[#88888F] hover:text-black'>Continue</button>
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

export default ChangePin
