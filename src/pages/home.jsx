import React from 'react'
import Headers from '@/components/header'
import Footers from '@/components/Footers'

import Image from 'next/image'
import profile from '../assets/profile1.jpg'

import {AiOutlineBell} from 'react-icons/ai'

function Home() {
  return (
    <main>
        <div>
            <Headers />
        </div>
        <div>
            <Footers />
        </div>
    </main>
  )
}

export default Home
