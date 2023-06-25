import React from 'react'
import Link from 'next/link'

import {AiOutlineMail, AiOutlineLock, AiOutlineUser} from 'react-icons/ai'
import BannerAuth from '@/components/BannerAuth'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Head from 'next/head'



import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { saveEmail } from '@/redux/reducers/auth'
import { MdError } from 'react-icons/md';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token

    if (token) {
      res.setHeader('location', '/home')
      res.statusCode = 302
      res.end()
      return { prop: { token } }
    }

    return {
      props: {
        token: null,
      },
    }
  },
  cookieConfig
)

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Please enter username min 3 character'),
  email: Yup.string()
    .email('Please inser valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password min 4 characters')
    .required('Password is required'),
})

function Register() {
  const [loading, setLoading] = React.useState(false)
  const [iconEye, setIconEye] = React.useState(false)
  const [typePassword, setTypePassword] = React.useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = React.useState('')

  const doRegister = async (values) => {
    try {
      setLoading(true)
      setErrorMessage('')
      const form = new URLSearchParams({
        username: values.username,
        email: values.email,
        password: values.password,
      }).toString()

      const { data } = await axios.post(
        'http://localhost:3000/api/register',
        form
      )

      if (data.success === true) {
        dispatch(saveEmail(values.email))
        router.push('/auth/create-pin')
      }
      const message = data.message
      if (message?.includes('duplicate')) {
        setErrorMessage('Email aready used!')
      }
    } finally {
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
          <title>Register</title>
        </Head>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
            <BannerAuth />
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <div className='w-[80%] flex flex-col justify-center mt-20'>
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
            <Formik initialValues={{ username: '', email: '', password: '',}} validationSchema={validationSchema} onSubmit={doRegister}>
              {({  values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className='flex flex-col mt-16'>
                  <div className='flex flex-col gap-4'>
                    <div>
                      <div className={`border-b-[1px] ${
                        errors.username && touched.username
                          ? 'border-error'
                          : 'border-[#eaeaea]'
                      } w-full h-12 flex items-center gap-5`}>
                        <i>
                          <AiOutlineUser  className={
                              errors.username && touched.username && 'text-error'
                            }
                          />
                        </i>
                        <input 
                          type="text"
                          name="username"
                          placeholder="Enter your username"
                          className="h-full w-full outline-none text-neutral"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username} 
                        />
                      </div>
                      {errors.username && touched.username && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.username}
                            </span>
                          </label>
                        )}
                    </div>
                   <div>
                     <div className={`border-b-[1px] ${
                        errors.username && touched.username
                          ? 'border-error'
                          : 'border-[#eaeaea]'
                        } w-full h-12 flex items-center gap-5`}>
                        <i>
                          <AiOutlineMail className={
                                errors.username && touched.username && 'text-error'
                              }
                            />
                        </i>
                        <input type="email"
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
                      <div className={`border-b-[1px] ${
                          errors.username && touched.username
                            ? 'border-error'
                            : 'border-[#eaeaea]'
                          } w-full h-12 flex items-center gap-5`}>
                        <i>
                          <AiOutlineLock className={
                                  errors.username && touched.username && 'text-error'
                                }
                          />
                        </i>
                        <input type={typePassword ? 'text' : 'password'}
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
                    <div className='mt-[90px]'>
                    {loading ? (
                    <button className="w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold">
                      <span className="loading loading-spinner loading-sm"></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold"
                    >
                      Sign Up
                    </button>
                  )}
                    </div>
                  </div>
                  <div className='flex justify-center mt-10'>
                    Already have an account? Let&apos;s Login <Link href='/auth/login' className='text-secondary'>Let&apos;s Login</Link>
                  </div>
                </form>
              )}
            </Formik>
        </div>
        </div>
    </div>
  )
}

export default Register
