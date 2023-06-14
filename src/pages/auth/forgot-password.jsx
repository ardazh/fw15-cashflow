import React from 'react'
import {AiOutlineMail, AiOutlineExclamation} from 'react-icons/ai'
import BannerAuth from '@/components/BannerAuth'
import { Formik } from 'formik'
import { withIronSessionSsr } from 'iron-session/next'
import coockieConfig from '@/helpers/cookieConfig'
import axios from 'axios'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { saveEmail } from '@/redux/reducers/auth'
import Head from 'next/head'

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
  coockieConfig
)

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required'),
})

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const doForgot = async (values) => {
    setErrorMessage('')
    setLoading(true)
    const form = new URLSearchParams({
      email: values.email,
    }).toString()

    const { data } = await axios.post(
      'http://localhost:3000/api/forgot-password',
      form
    )
    if (data.message === 'auth_forgot_already_requested') {
      dispatch(saveEmail(values.email))
      setErrorMessage('Request OK, You will redirect to reset page')
      setLoading(false)
      setTimeout(() => {
        router.push('/auth/reset-password')
      }, 1500)
    }
    if (data.message === 'auth_wrong_user') {
      setErrorMessage('Email not registered')
      setLoading(false)
    }
    if (data.message === 'internal_server_error') {
      setErrorMessage('Backend not connected')
      setLoading(false)
    }
    if (data.success === true) {
      dispatch(saveEmail(values.email))
      router.push('/auth/reset-password')
      setLoading(false)
    }
  }
  return (
    <div className='flex'>
        <Head>
          <title>Forgot Password</title>
        </Head>
        <div className='hidden md:flex flex-1 bg-[#E14D2A] w-1/2'>
            <BannerAuth />
        </div>
        <div className='max-w-md w-full flex justify-center items-center'>
          <div className='w-[80%] flex flex-col justify-center'>
            <div className='flex flex-col gap-7'>
              <div className='text-2xl text-[#3A3D42] font-bold'>
                Did You Forgot Your Password?
                Don&apos;t Worry, You Can Reset Your
                Password In a Minutes.
              </div>
              <div className='text-base text-[#3A3D4]'>
              To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
              </div>
            </div>
            <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={doForgot}>
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className='flex flex-col mt-16 gap-14'>
                  {errorMessage && (
                    <div className="flex flex-row justify-center alert alert-warning shadow-lg text-white text-lg">
                      <AiOutlineExclamation size={30} />
                      {errorMessage}
                    </div>
                  )}
                  <div>
                    <div className={`border-b-[1px] ${
                        errors.email && touched.email && 'border-error'
                      } border-[#eaeaea] w-full h-12 flex items-center gap-5`}>
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
                </form>
              )}
            </Formik>
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
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ForgotPassword
