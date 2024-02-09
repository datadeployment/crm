"use client"
import React, { useEffect, useState } from 'react'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import toast from 'react-hot-toast'
import { handleGetLeadsDataRequest } from '@/redux/actions-reducers/leads/leads'
import { useDispatch, useSelector } from 'react-redux'
import { accountInformationLabel, personalInformationName } from '../LeadFormData'
import { useSearchParams } from 'next/navigation'

const ViewLead = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const searchParams = useSearchParams()

    const { leadData } = useSelector((state: any) => state.Leads)

    const leadId = Number(searchParams.get('leadId'))

    useEffect(() => {
        if (leadId) {
            dispatch(handleGetLeadsDataRequest({
                id: leadId
            }))

        }
    }, [leadId])

    return (<>
        <div className='flex justify-between'>
            <div className='text-4xl font-bold text-primary1'>View Lead</div>
            <div>
                <Button
                    buttontype="secondary"
                    title={"Back"}
                    type='button'
                    className="mr-2"
                    onClick={() => handleNavigation({ path: "/leads", router })}
                />
                <Button
                    buttontype="primary"
                    title={"Update"}
                    type='submit'

                />
            </div>
        </div>

        {/* <div className='flex justify-start flex-wrap'>
            {leadData && leadData.length > 0 && (<>
                {personalInformationName.map((item: any) => {
                    if (leadData[0][item.value]) {
                        return (<>
                            <div className='text-lg m-6'>{item.labeltext}: {leadData[0][item.value]}</div>
                        </>)
                    }
                })}
            </>)}
        </div> */}
        <div className='mt-8'>

            <div className='text-2xl text-primary1 mb-4'>
                Personal Information
            </div>

            <div className='w-full flex flex-wrap '>
                {leadData && leadData.length > 0 && (<>
                    {personalInformationName.map((item: any, index: number) => {
                        if (leadData[0][item.value]) {
                            return (<>
                                <div key={index} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                                    <div className='text-lg'>
                                        <b>{item.labeltext}:</b> {leadData[0][item.value]}</div>
                                </div>
                            </>)
                        }
                    })}
                </>)}
            </div>



            {leadData && leadData.length > 0 && (<>
                {leadData[0].accountData && Array.isArray(leadData[0].accountData) && leadData[0].accountData.length > 0 && (<>
                    <div className='text-2xl text-primary1 mt-6 mb-4'>
                        Account Information
                    </div>
                    <div className='w-full flex flex-wrap '>
                        {leadData[0].accountData.map((accountItem: any, index: any) => {
                            return (<>
                                {Object.keys(accountInformationLabel).map((keyItem: string) => {
                                    return (<>
                                        <div key={index} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                                            <div className='text-lg'>
                                                <b>{accountInformationLabel[keyItem]}:</b> {accountItem[keyItem]}</div>
                                        </div>
                                    </>)
                                })}
                                {leadData[0].accountData.length !== index + 1 && (<>
                                    <div className="w-full border-2 border-solid">
                                        {/* &nbsp; */}
                                    </div>
                                </>)}
                            </>)
                        })}
                    </div>
                </>)}
            </>)}
        </div>

    </>)
}

export default ViewLead
