import React from 'react'
import Headers from '@/components/Header'
import Footers from '@/components/Footers'
import Aside from '@/components/Aside'




function Home() {
  return (
    <main className='bg-[#E5E5E5]'>
        <div>
            <Headers />
        </div>
        <div>
          <Aside />
        </div>
        <div>
            <Footers />
        </div>
    </main>
  )
}

export default Home
