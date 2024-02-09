"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import Button from '@/components/Button'

const SignUp = () => {
  const router = useRouter()
  const [signupFormData, setSignupFormData] = useState({ user_role: "employee", name: "", email: "", password: "", phone: "" })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      showLoader()
      const api_res_role = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-role/default-data`, { method: "POST", body: JSON.stringify(signupFormData) })
      const res_data_role = await api_res_role.json()
      if (res_data_role.status_code === 200) {
        const api_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, { method: "POST", body: JSON.stringify(signupFormData) })
        const res_data = await api_res.json()
        if (res_data.status_code === 200) {
          toast.success(res_data.message)
          handleNavigation({ path: "/signin", router })
        } else {
          hideLoader()
          toast.error(res_data.message)
        }
      } else {
        hideLoader()
        toast.error(res_data_role.message)
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
            Start using Talk Legal today!
          </div>
          <div className='text-2xl mt-20 '>
            Sign Up
          </div>
          <div>
            Already have an account? <Link
              href="/signin"
              onClick={e => {
                e.preventDefault()
                handleNavigation({ path: "/signin", router })
              }}
              className='font-bold'
            >
              Log in here
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mt-16'>
              {/* <div className='mb-2'>Signup as</div> */}
              {/* <div className='flex justify-start'> */}
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
              {/* <div className='mr-8 flex items-center'>
                  <input
                    className='cursor-pointer mr-2'
                    type="radio"
                    name="user_role"
                    id="employee"
                    onChange={(e) => {
                      setSignupFormData({ ...signupFormData, user_role: "employee" })
                    }}
                    checked={signupFormData.user_role === "employee"}
                  /> <label className='cursor-pointer' htmlFor="employee">Employee</label>
                </div>
                <div className='flex items-center'>
                  <input
                    className='cursor-pointer mr-2'
                    type="radio"
                    name="user_role"
                    id="client"
                    onChange={(e) => {
                      setSignupFormData({ ...signupFormData, user_role: "client" })
                    }}
                    checked={signupFormData.user_role === "client"}
                  /> <label className='cursor-pointer' htmlFor="client">Client</label>
                </div> */}
              {/* </div> */}
              <div className='flex mt-4'>
                <div className='w-full'>
                  <Input
                    labeltext="Enter Name"
                    type="text"
                    required={true}
                    onChange={(e: any) => {
                      setSignupFormData({ ...signupFormData, name: e.target.value })
                    }}
                    value={signupFormData.name}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className='mt-4'>
                <Input
                  labeltext="Email Address"
                  type="email"
                  required={true}
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, email: e.target.value })
                  }}
                  value={signupFormData.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className='mt-4'>
                <Input
                  labeltext="Password"
                  type="password"
                  required={true}
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, password: e.target.value })
                  }}
                  value={signupFormData.password}
                  placeholder="Enter your password"
                />
              </div>
              <div className='mt-4'>
                <Input
                  labeltext="Phone"
                  type="number"
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, phone: e.target.value })
                  }}
                  value={signupFormData.phone}
                  placeholder="Enter your phone"
                />
              </div>

              <div className='mt-4'>

                <Button
                  buttontype="primary"
                  title={"Sign Up"}
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

export default SignUp
