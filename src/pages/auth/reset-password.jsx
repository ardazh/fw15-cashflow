import React from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import coockieConfig from '@/helpers/cookieConfig'
import axios from 'axios'
import react from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {AiOutlineLock, AiOutlineExclamation} from 'react-icons/ai'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import BannerAuth from '@/components/BannerAuth'

import { Formik } from 'formik'
import * as Yup from 'yup'

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
  password: Yup.string()
    .min(4, 'Password min 4 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

function ResetPassword() {
  const userEmail = useSelector((state) => state.auth.email)
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [iconEye, setIconEye] = React.useState(false)
  const [typePassword, setTypePassword] = React.useState(false)
  const [iconEyeConf, setIconEyeConf] = React.useState(false)
  const [typePasswordConf, setTypePasswordConf] = React.useState(false)
  const [successMessage, setSuccessMessage] = react.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const doReset = async (values) => {
    setErrorMessage('')
    setLoading(true)
    const form = new URLSearchParams({
      email: userEmail,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    }).toString()

    const { data } = await axios.post(
      'http://localhost:3000/api/reset-password',
      form
    )

    if (data.message === 'auth_reset_password_not_match') {
      setErrorMessage('You have not made a reset request')
      setLoading(false)
    }
    if (data.success === true) {
      setLoading(false)
      setSuccessMessage(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    }
  }

  const handleInputPassword = () => {
    setIconEye(!typePassword)
    setTypePassword(!iconEye)
  }

  const handleConfirmPassword = () => {
    setIconEyeConf(!typePasswordConf)
    setTypePasswordConf(!iconEyeConf)
  }

  return (
    <div className='flex'>
        <Head>
          <title>Reset Password</title>
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
            <Formik initialValues={{ password: '', confirmPassword: '' }} validationSchema={validationSchema} onSubmit={doReset}>
              {({  values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-5 mt-5"
                autoComplete="off"
              >
                {successMessage && (
                  <div className="flex flex-row justify-center alert bg-green-500 border-none shadow-lg text-white text-lg">
                    Success, you will redirect to login page !
                  </div>
                )}
                {errorMessage && (
                  <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
                    <AiOutlineExclamation size={30} />
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col gap-12">
                  <div
                    className={`border-b-[1px] ${
                      errors.password && touched.password && 'border-error'
                    } border-[#eaeaea] w-full h-12 flex items-center gap-5`}
                  >
                    <div>
                      <i>
                        <AiOutlineLock
                          size={20}
                          className={
                            errors.password && touched.password && 'text-error'
                          }
                        />
                      </i>
                    </div>
                    <div className="h-full w-full relative">
                      <input
                        type={typePassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create new password"
                        className="h-full w-full outline-none text-neutral"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <button
                        type="button"
                        onClick={handleInputPassword}
                        className="absolute top-3 right-2"
                      >
                        {iconEye ? (
                          <i>
                            <FiEye size={20} />
                          </i>
                        ) : (
                          <i>
                            <FiEyeOff size={20} />
                          </i>
                        )}
                      </button>
                      {errors.password && touched.password && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.password}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div
                    className={`border-b-[1px] ${
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      'border-error'
                    } border-[#eaeaea] w-full h-12 flex items-center gap-5`}
                  >
                    <div>
                      <i>
                        <AiOutlineLock
                          size={20}
                          className={
                            errors.confirmPassword &&
                            touched.confirmPassword &&
                            'text-error'
                          }
                        />
                      </i>
                    </div>
                    <div className="h-full w-full relative">
                      <input
                        type={typePasswordConf ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Enter confirm password"
                        className="h-full w-full outline-none text-neutral"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={handleConfirmPassword}
                        className="absolute top-3 right-2"
                      >
                        {iconEyeConf ? (
                          <i>
                            <FiEye size={20} />
                          </i>
                        ) : (
                          <i>
                            <FiEyeOff size={20} />
                          </i>
                        )}
                      </button>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.confirmPassword}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="self-center w-full mt-7">
                  {loading ? (
                    <button
                      type="submit"
                      className="w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold"
                    >
                      <span className="loading loading-spinner loading-sm"></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full btn btn-secondary capitalize text-base text-white font-semibold hover:font-bold"
                    >
                      Reset Password
                    </button>
                  )}
                  {/* <button
                    type="submit"
                    className="w-full btn btn-primary capitalize text-base text-white font-semibold hover:font-bold"
                  >
                    Reset Password
                  </button> */}
                </div>
              </form>
            )}
            </Formik>
        </div>
        </div>
    </div>
  )
}

export default ResetPassword
