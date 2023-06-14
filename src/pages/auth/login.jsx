import React from 'react'
import Link from 'next/link'


import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BannerAuth from '@/components/BannerAuth'
import Head from 'next/head'
import { MdError } from 'react-icons/md'

import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const token = req.session.token;

    if (token) {
      res.setHeader('location', '/home')
      res.statusCode = 302
      res.end()
      return {
          props: {
            token
          }
      };
    }

    return {
      props: {},
    };
  },
  cookieConfig
);

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please insert valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

function Login() {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [iconEye, setIconEye] = React.useState(false)
  const [typePassword, setTypePassword] = React.useState(false)
  const router = useRouter()
  
  const doLogin = async (values) => {
    setErrorMessage('')
    setLoading(true)
    const form = new URLSearchParams({
      email: values.email,
      password: values.password,
    }).toString()

    const { data } = await axios.post('http://localhost:3000/api/login', form)
    if (data.success === false) {
      setErrorMessage('Wrong email or password !')
      setLoading(false)
    }
    if (data.success === true) {
      router.push('/home')
      setLoading(false)
    }
  }

  const handleInputPassword = () => {
    setIconEye(!typePassword)
    setTypePassword(!iconEye)
  }

  return (
    <div className='flex'>
        <Head>
          <title>Login</title>
        </Head>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
          <BannerAuth />
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <div className='w-[80%] flex flex-col justify-center'>
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
            {errorMessage && (
            <div className="flex alert alert-error shadow-lg text-white text-base mt-5">
                <MdError size={20} />
                {errorMessage}
              </div>
            )}
            <Formik initialValues={{ email: '', password: '',}} validationSchema={validationSchema}onSubmit={doLogin}>
              {({  values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className='flex flex-col mt-5' >
                  <div className='flex flex-col gap-14'>
                    <div>
                      <div className={`border-b-[1px] border-[#eaeaea] ${
                        errors.email && touched.email && 'border-error'
                      } w-full h-12 flex items-center gap-5`}>
                        <i>
                          <AiOutlineMail className={
                                errors.email && touched.email && 'text-error'
                              } 
                            />
                        </i>
                        <input 
                          type="email"
                          name="email"
                          placeholder="Enter your e-mail"
                          className="h-full w-full outline-none text-neutral"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.email}
                          </span>
                        </label>
                      )}
                    </div>
                    <div>
                      <div className={`border-b-[1px] border-[#eaeaea] ${
                        errors.email && touched.email && 'border-error'
                      } w-full h-12 flex items-center gap-5`}>
                        <i>
                          <AiOutlineLock className={
                                errors.password && touched.password && 'text-error'
                              }
                            />
                        </i>
                        <input 
                          type={typePassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          className="h-full w-full outline-none text-neutral"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password} 
                        />
                        <button type='button' onClick={handleInputPassword}>
                          {iconEye ? (
                              <i className=''>
                                  <FaEye size={20} />
                              </i>
                          ) : (
                              <i className=''>
                                  <FaEyeSlash size={20} />
                              </i>
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.password}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className='text-secondary text-right mt-[]'>
                    <Link href='/auth/forgot-password'>Forgot password?</Link>
                  </div>
                  <div className='mt-[90px]'>
                  {loading ? (
                    <button className="w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold">
                      <span className="loading loading-spinner loading-sm"></span>
                    </button>
                  ) : (
                    <button className="w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold">
                      Log In
                    </button>
                  )}
                  </div>
                </form>
              )}
            </Formik>
            <div className='flex justify-center mt-10'>
              Don&apos;t have an account? <Link href='/auth/register' className='text-secondary normal-case'>Let&apos;s Sign Up</Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login
