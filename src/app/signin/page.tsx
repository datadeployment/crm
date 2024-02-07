"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'
import { API_URL } from '@/constant'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { handleGetUserDataRequest } from '@/redux/actions-reducers/auth/auth'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import Button from '@/components/Button'
const Signin = () => {
  const [signinFormData, setSigninFormData] = useState({ email: "", password: "", user_role: "employee" })
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    showLoader()
    try {
      const api_res = await fetch(`${API_URL}/auth/signin`, { method: "POST", body: JSON.stringify(signinFormData) })
      const res_data = await api_res.json()

      if (res_data.status_code === 200) {
        toast.success(res_data.message)
        handleNavigation({ path: "/leads", router })
        dispatch(handleGetUserDataRequest())
      } else {
        hideLoader()
        toast.error(res_data.message)
      }
    } catch (err: any) {
      hideLoader()
      toast.error(err.message)
    }

  }

  return (
    <div className='flex w-full'>
      <div className='lg:w-full lg:h-screen lg:justify-center lg:items-center lg:bg-primary4 hidden lg:flex '>
        <Advertisement />
      </div>
      <div className='lg:p-14 lg:w-6/12 w-full p-14 h-screen'>
        <div className='flex flex-col justify-center h-5/6'>
          <div className='font-black text-3xl'>
            Talk Legal
          </div>
          <div className='text-2xl mt-20 '>
            Sign In
          </div>
          <div>
            Don't have an account yet? <Link
              href="/signup"
              onClick={e => {
                e.preventDefault()
                handleNavigation({ path: "/signup", router })
              }}
              className='font-bold'
            >
              Sign Up
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mt-10'>
              <div className='mb-2'>Signin as</div>
              <div className='flex justify-start'>
                {/* <div>
                  <input
                    className='cursor-pointer'
                    type="radio"
                    name="user_role"
                    id="super-admin"
                    onChange={(e) => {
                      setSignupFormData({ ...signupFormData, user_role: "super-admin" })
                    }}
                    checked={signupFormData.user_role === "super-admin"}
                  /> <label className='cursor-pointer' htmlFor="super-admin">Super Admin</label>
                </div> */}
                {/* <div>
                  <input
                    className='cursor-pointer'
                    type="radio"
                    name="user_role"
                    id="admin"
                    onChange={(e) => {
                      setSignupFormData({ ...signupFormData, user_role: "admin" })
                    }}
                    checked={signupFormData.user_role === "admin"}
                  /> <label className='cursor-pointer' htmlFor="admin">Admin</label>
                </div> */}
                <div className='mr-8 flex items-center'>
                  <input
                    className='cursor-pointer mr-2'
                    type="radio"
                    name="user_role"
                    id="employee"
                    onChange={(e) => {
                      setSigninFormData({ ...signinFormData, user_role: "employee" })
                    }}
                    checked={signinFormData.user_role === "employee"}
                  /> <label className='cursor-pointer' htmlFor="employee">Employee</label>
                </div>
                {/* <div className='flex items-center'>
                  <input
                    className='cursor-pointer mr-2'
                    type="radio"
                    name="user_role"
                    id="client"
                    onChange={(e) => {
                      setSigninFormData({ ...signinFormData, user_role: "client" })
                    }}
                    checked={signinFormData.user_role === "client"}
                  /> <label className='cursor-pointer' htmlFor="client">Client</label>
                </div> */}
              </div>
              <div className='mt-6'>
                <Input
                  labeltext="Email"
                  type="email"
                  onChange={(e: any) => {
                    setSigninFormData({ ...signinFormData, email: e.target.value })
                  }}
                  value={signinFormData.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className='mt-4'>
                <Input
                  labeltext="Password"
                  type="password"
                  onChange={(e: any) => {
                    setSigninFormData({ ...signinFormData, password: e.target.value })
                  }}
                  value={signinFormData.password}
                  placeholder="Enter your password"
                />
              </div>
              <div className='mt-4'>
                <div className='flex justify-between'>

                  <div className='flex'>
                    <input type="checkbox" id='remember_me' className='mr-1 w-5' />
                    <label htmlFor="remember_me"> Remember Me</label>
                  </div>

                  <div>
                    <Link
                      href={"/forgot-password"}
                      onClick={e => {
                        e.preventDefault()
                        handleNavigation({ path: "/forgot-password", router })
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <Button
                  buttonType="primary"
                  title={"Sign In"}
                  type='submit'
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </div>
        <div className='text-center text-primary3'>
          {/* © {new Date().getFullYear()} All rights reserved. */}
        </div>
      </div>
    </div>
  )
}

export default Signin
