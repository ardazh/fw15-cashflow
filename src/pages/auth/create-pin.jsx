import React from 'react'
import http from '@/helpers/http'
import cookieConfig from '@/helpers/cookieConfig'
import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import {AiOutlineExclamation, AiOutlineCheckCircle } from 'react-icons/ai'
import BannerAuth from '@/components/BannerAuth'
import PinInput from '@/components/PinInput'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token

    if (!token) {
      res.setHeader('location', '/')
      res.statusCode = 302
      res.end()
      return {
        prop: {},
      }
    }
    const { data } = await http(token).get('/profile')

    return {
      props: {
        token,
        user: data.results,
      },
    }
  },
  cookieConfig
)
    

const CreatePin = ({ user }) => {
  const email = user.email
  const router = useRouter()
  const [pin, setPin] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMassage] = React.useState(false)

  const doCreatePin = async (e) => {
    try {
      e.preventDefault()

      setErrorMessage('')
      setSuccessMassage('')
      setLoading(true)

      const form = new URLSearchParams({
        email,
        pin,
      }).toString()

      const { data } = await http().post('/auth/set-pin', form)
      if (data.success === false) {
        setErrorMessage('Create pin failed, try again')
        setLoading(false)
      }
      if (data.success === true) {
        setSuccessMassage('Your PIN Was Successfully Created')
        setTimeout(() => {
          router.push('/home')
          setLoading(false)
          setSuccessMassage('')
        }, 2000)
      }
    } catch (error) {
      const message = error?.response?.data.message
      if (message?.includes('Internal')) {
        setErrorMessage('Internal Server Error')
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex'>
        <Head>
          <title>Create Pin</title>
        </Head>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
            <BannerAuth />
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <div className='w-[80%] flex flex-col justify-center'>
            <div className='flex flex-col gap-7'>
              <div className='text-2xl text-[#3A3D42] font-bold'>
                Secure Your Account, Your Wallet,
                and Your Data With 6 Digits PIN
                That You Created Yourself.
              </div>
              <div className='text-base text-[#3A3D4] mb-12'>
                Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don&apos;t tell anyone about your FazzPay account password and the PIN.
              </div>
            </div>
            <form
            onSubmit={doCreatePin}
            className="w-full flex flex-col gap-5"
            autoComplete="off"
          >
            {errorMessage && (
              <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
                <AiOutlineExclamation size={30} />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="flex flex-row justify-center alert alert-success shadow-lg text-white text-lg">
                <AiOutlineCheckCircle size={30} />
                {successMessage}
              </div>
            )}
            <div className="flex flex-col gap-12">
              <PinInput onChangePin={setPin} />
            </div>
            <div className="self-center w-full mt-7">
              {loading ? (
                <button
                  className={`w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold ${
                    successMessage && 'hidden'
                  }`}
                >
                  <span className="loading loading-spinner loading-sm"></span>
                </button>
              ) : (
                <button
                  className={`w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold ${
                    successMessage && 'hidden'
                  }`}
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
        </div>
    </div>
  )
}

export default CreatePin
