"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { LuLogOut } from "react-icons/lu";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils';
const Navbar = () => {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state: any) => state.Auth)
    const router = useRouter()
    const imgUrl = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"

    const handleLogout = async () => {
        try {
            showLoader()
            const api_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, { method: "GET" })
            const res_data = await api_res.json()

            if (res_data.status_code === 200) {
                toast.success(res_data.message)
                localStorage.clear()
                handleNavigation({ path: "/signin", router })
            } else {
                hideLoader()
                toast.error(res_data.message)
            }
        } catch (err: any) {
            hideLoader()
            toast.error(err.message)
        }
    }

    return (<>
        {isLoggedIn === true && (<>
            <div className='p-5 bg-white' style={{ borderBottom: "1px solid #ebebeb", boxShadow: "0px -4px 10px 10px #ebebeb" }}>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div className='font-extrabold text-2xl mr-16 cursor-pointer' onClick={() => handleNavigation({ path: "/", router })}>
                            TALK LEGAL
                        </div>
                        <div className='flex font-extrabold items-center'>
                            <div className='mr-8 cursor-pointer' onClick={() => handleNavigation({ path: "/leads", router })}>
                                Leads
                            </div>
                            <div className='mr-8 cursor-pointer' onClick={() => handleNavigation({ path: "/accounts", router })}>
                                Account
                            </div>
                            <div className='mr-8 cursor-pointer' onClick={() => handleNavigation({ path: "/contacts", router })}>
                                Contact
                            </div>
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='mr-4'>
                            <img src={imgUrl} alt="user_img" className='cursor-pointer w-8' />
                        </div>
                        <div className='flex items-center' onClick={handleLogout}>
                            <LuLogOut size={25} className='cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </>)}
    </>)
}

export default Navbar
