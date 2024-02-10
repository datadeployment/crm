"use client"
import React, { useEffect, useState } from 'react'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import toast from 'react-hot-toast'
import LeadFormData from '../LeadFormData'
import { useSelector } from 'react-redux'

const CreateLead = () => {
    const router = useRouter()
    const { user_data } = useSelector((state: any) => state.Auth)
    const [personalInformation, setPersonalInformation] = useState<any>({
        name: "",
        email: "",
        phone: "",
        lawyerName: "",
        description: "",
        loanAgreementStatus: "",
        dob: "",
        gender: "",
        creditScore: "",
        rationCard: "",
        address: "",
        pan: "",
        passport: "",
        telephone: "",
        voterId: "",
        aadhaarNumber: "",
        drivingLicense: ""
    })
    const accountInformationObj = JSON.parse(JSON.stringify({
        bankId: "",
        accountType: "",
        ownership: "",
        dateReported: "",
        accountStatus: "",
        dateOpened: "",
        sanctionAmount: "",
        currentBalance: "",
        amountOverdue: ""
    }))
    const [accountInformation, setAccountInformation] = useState([accountInformationObj])
    console.log("user_data", user_data)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            showLoader()
            const payload = {
                ...personalInformation,
                assignUser: user_data.user_role !== 1 ? user_data.id : "",
                accountData: Object.values(accountInformation[0]).join("").length > 0 ? accountInformation : []
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
                method: "POST",
                body: JSON.stringify(payload)
            })
            const res_json = await response.json()

            if (res_json.status_code === 200) {
                hideLoader()
                toast.success(res_json.message)
                handleNavigation({ path: "/leads", router })
            } else {
                hideLoader()
                toast.error(res_json.message)
            }
        } catch (err: any) {
            hideLoader()
            toast.error(err.message)
        }
    }


    console.log("accountInformation", accountInformation)
    console.log("personalInformation", personalInformation)
    return (<>
        <form onSubmit={handleSubmit}>
            <div className='flex justify-between'>
                <div className='text-4xl font-bold text-primary1'>Create Lead</div>
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
                        title={"Save"}
                        type='submit'

                    />
                </div>
            </div>

            <LeadFormData
                personalInformation={personalInformation}
                setPersonalInformation={setPersonalInformation}
                accountInformation={accountInformation}
                setAccountInformation={setAccountInformation}
                accountInformationObj={accountInformationObj}
            />

        </form>
    </>)
}

export default CreateLead
