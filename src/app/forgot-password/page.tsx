import React from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'
import Button from '@/components/Button'

const SignUp = () => {
  return (
    <div className='flex w-full'>
      <div className='lg:w-full lg:h-screen lg:justify-center lg:items-center lg:bg-primary4 hidden lg:flex '>
        <Advertisement />
      </div>
      <div className='lg:p-14 lg:w-6/12 w-full p-14 h-screen'>
        <div className='flex flex-col justify-center h-5/6'>
          {/* <div className='font-black text-3xl'>
            Talk Legal
          </div> */}
          <div className='text-2xl mt-20 text-center'>
            Password Reset
          </div>
          <div className='text-[#78889B] text-center mt-2'>
            Enter your email address associated with your account. If you have an active account, we’ll send you a link to your email to reset your password.
          </div>

          <div className='mt-12'>

            <Input
              labeltext="Email Address"
              type="email"
              placeholder="Enter your email"
            />
            <div className='mt-4'>
              <Button
                buttontype="primary"
                title={"Send"}
                type='button'
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className='text-center text-primary3'>
          {/* © {new Date().getFullYear()} All rights reserved. */}
        </div>
      </div>
    </div>
  )
}

export default SignUp
