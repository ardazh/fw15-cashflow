import React from 'react'
import Image from 'next/image'
import profile1 from '../assets/profile1.png'
import Link from 'next/link'
import http from '@/helpers/http'

import {AiOutlineBell} from 'react-icons/ai'

const Header = ({ token }) => {
    const [profile, setProfile] = React.useState({})

    React.useEffect(() => {
        if (token) {
            async function getProfile() {
                const {data} = await http(token).get('/profile')
                setProfile(data.results)
            }
            getProfile()
        }
    },[token])
    console.log(token)
    
  return (
    <header className='flex justify-between px-[150px] py-[50px] border-b-4 rounded-b-2xl shadow-lg bg-[#FFFFFF]'>
        <div className='font-bold text-primary text-[29px]'>CashFlow</div>
        {token ? (
            <div className='flex items-center'>
            <Link href='/profile/profile' className='flex'>
                <div className='flex items-center justify-center border w-[52px] h-[52px] rounded-xl overflow-hidden object-cover mr-[20px]'>
                {profile?.picture ? (
                <Image
                  width={150}
                  height={150}
                  className="object-fit"
                  src={user.picture}
                  alt="userImage"
                />
              ) : (
                <Image
                  width={150}
                  height={150}
                  className="object-fit"
                  src={profile1}
                  alt="user"
                />
              )}
                </div>
                <div className='flex flex-col text-[#3A3D42] mr-[33px]'>
                    <div className='text-lg font-bold'>{profile?.fullName}</div>
                    <div className='text-[13px]'>{profile?.username}</div>
                </div>
            </Link>
            <i className='text-[#4D4B57]'>
                <AiOutlineBell size={24} />
            </i>
        </div>
        ) : (
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/auth/login"
                className="btn btn-ghost w-28 text-base font-semibold capitalize text-primary border-primary rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-primary w-28 text-base font-semibold capitalize text-white rounded-xl"
              >
                Sign Up
              </Link>
            </div>
            )}
    </header>
  )
}

export default Header
