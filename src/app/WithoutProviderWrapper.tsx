"use client"
import React from 'react';
import { useSelector } from 'react-redux';

const WithoutProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user_data } = useSelector((state: any) => state.Auth)

    return (<>
        <div
            className={`${user_data ? "m-4" : ""}`}
        >
            {children}
        </div>
    </>)
}

export default WithoutProviderWrapper
