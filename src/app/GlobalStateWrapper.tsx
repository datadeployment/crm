"use client"

import { handleGetUserDataRequest } from '@/redux/actions-reducers/auth/auth';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hideLoader, showLoader } from '@/utils/utils';

const GlobalStateWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const pathname = usePathname();
    useEffect(() => {
        dispatch(handleGetUserDataRequest())
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (pathname === location.pathname) {
                hideLoader()
            } else {
                showLoader()
            }
        }
    }, [pathname])

    return (<>
        {children}
    </>)
}

export default GlobalStateWrapper
