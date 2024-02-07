"use client"
import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/SelectDropdown'
import Input from '@/components/input'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import DocumentComponent from './DocumentComponent'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetBankDataRequest } from '@/redux/actions-reducers/bank/bank'
import { API_URL } from '@/constant'
import qs from "qs"
import toast from 'react-hot-toast'

const personalInformationName: any = [

    {
        labeltext: "Name",
        value: "name",
        type: "text",
        placeholder: "Enter",
        required: true
    },
    {
        labeltext: "Email",
        value: "email",
        type: "email",
        placeholder: "Enter",
        required: true
    },
    {
        labeltext: "Phone",
        value: "phone",
        type: "number",
        placeholder: "Enter",
        required: true
    },
    {
        labeltext: "Date of Birth",
        value: "dob",
        type: "date",
        placeholder: "Select"
    },
    {
        labeltext: "Gender",
        value: "gender",
        type: "text",
        placeholder: "Select"
    },
    {
        labeltext: "Credit Score",
        value: "creditScore",
        type: "number",
        placeholder: "Enter"
    },
    {
        labeltext: "Ration Card",
        value: "rationCard",
        type: "text",
        placeholder: "Enter"
    },
    {
        labeltext: "Address",
        value: "address",
        type: "text",
        placeholder: "Enter"
    },
    {
        labeltext: "Pan Number",
        value: "pan",
        type: "text",
        placeholder: "Enter"
    },
    {
        labeltext: "Passport",
        value: "passport",
        type: "text",
        placeholder: "Enter"
    },
    {
        labeltext: "Telephone",
        value: "telephone",
        type: "number",
        placeholder: "Enter"
    },
    {
        labeltext: "Voter Id",
        value: "voterId",
        type: "text",
        placeholder: "Enter"
    },
    {
        labeltext: "Aadhaar Number",
        value: "aadhaarNumber",
        type: "number",
        placeholder: "Enter"
    },
    {
        labeltext: "Driving License",
        value: "drivingLicense",
        type: "text",
        placeholder: "Enter"
    }
]

const CreateLead = () => {
    const { bankList } = useSelector((state: any) => state.Bank)
    const { account_type_dropdown, account_ownership_dropdown, account_status_dropdown, gender_dropdown } = useSelector((state: any) => state.Static)
    const router = useRouter()
    const [creditReportFile, setCreditReportFile] = useState("")
    const [isBankListLoad, setIsBankListLoad] = useState(false)

    const [personalInformation, setPersonalInformation] = useState<any>({
        name: "",
        email: "",
        phone: "",
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            showLoader()
            const payload = {
                ...personalInformation,
                accountData: accountInformation
            }

            const response = await fetch(`${API_URL}/leads`, {
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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleGetBankDataRequest({
            currentPage: 1,
            perPage: 50
        }))
    }, [])

    // Load options using async API call
    const loadOptions = async (inputValue: string) => {
        try {
            setIsBankListLoad(true)
            const params = qs.stringify({
                currentPage: 1,
                perPage: 50,
                search: inputValue
            })
            const response: Response = await fetch(`${API_URL}/bank?${params}`, {
                method: "GET"
            });
            const jsonData: any = await response.json();
            setIsBankListLoad(false)
            return jsonData.data
        } catch (error) {
            setIsBankListLoad(false)
            console.error('Error fetching bank data:', error);
            return [];
        }
    };


    console.log("accountInformation", accountInformation)
    console.log("personalInformation", personalInformation)
    return (<>
        <form onSubmit={handleSubmit}>
            <div className='flex justify-between'>
                <div className='text-4xl font-bold text-primary1'>Create Leads</div>
                <div>
                    <Button
                        buttonType="secondary"
                        title={"Back"}
                        type='button'
                        className="mr-2"
                        onClick={() => handleNavigation({ path: "/leads", router })}
                    />
                    <Button
                        buttonType="primary"
                        title={"Save"}
                        type='submit'

                    />
                </div>
            </div>
            <div className='mt-8'>
                <div className='text-2xl text-primary1 mb-4'>
                    Personal Information
                </div>
                <div className='my-3'>
                    <input type="file" onChange={(e: any) => {
                        if (e && e.target.files?.length > 0) {
                            setCreditReportFile(URL.createObjectURL(e.target.files[0]))
                        } else {
                            setCreditReportFile("")
                        }
                    }} />

                    <DocumentComponent
                        file={creditReportFile}
                        documentData={(data: any) => {
                            console.log("dd", data)
                            const obj: any = {}
                            data.map((item: any, index: number) => {
                                if (index === 438) {
                                    // report_created
                                    console.log("report_created", item.str)
                                }

                                if (index === 12) {
                                    obj["name"] = item.str
                                }

                                if (index === 16) {
                                    obj["address"] = item.str
                                }

                                if (index === 20) {
                                    obj["dob"] = moment(new Date(item.str)).format("YYYY-MM-DD")
                                }

                                if (index === 24) {
                                    obj["pan"] = item.str
                                }

                                if (index === 28) {
                                    obj["telephone"] = item.str
                                }

                                if (index === 32) {
                                    obj["gender"] = item.str
                                }

                                if (index === 36) {
                                    obj["passport"] = item.str
                                }

                                if (index === 40) {
                                    obj["phone"] = item.str
                                }

                                if (index === 44) {
                                    obj["email"] = item.str
                                }

                                if (index === 48) {
                                    obj["voterId"] = item.str
                                }

                                if (index === 52) {
                                    obj["drivingLicense"] = item.str
                                }

                                if (index === 56) {
                                    obj["aadhaarNumber"] = item.str
                                }

                                if (index === 60) {
                                    obj["rationCard"] = item.str
                                }

                                if (index === 66) {
                                    obj["creditScore"] = item.str
                                }
                            })
                            console.log("obj", obj)
                            setPersonalInformation({ ...personalInformation, ...obj })
                        }}
                    />
                </div>


                <div className='w-full flex flex-wrap '>
                    {personalInformationName.map((item: any, index: number) => (
                        <div key={index} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            {item.value === "gender" ? (
                                <SelectDropdown
                                    {...item}
                                    onChange={(e: any) => {
                                        setPersonalInformation({ ...personalInformation, [item.value]: e.value })
                                    }}
                                    value={gender_dropdown.filter((io: any) => io.value === personalInformation[item.value])}
                                    options={gender_dropdown}
                                    isSearchable={false}
                                />
                            ) : (
                                <Input
                                    {...item}
                                    onChange={(e: any) => setPersonalInformation({ ...personalInformation, [item.value]: e.target.value })}
                                    value={personalInformation[item.value]}
                                    placeholder={`${item.placeholder} ${item.labeltext}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>

                    <div className='text-2xl text-primary1 mt-6 mb-4'>
                        Account Information
                    </div>
                    <div className='flex items-center'>

                        <Button
                            buttonType="primary"
                            title={"Add"}
                            type='button'
                            className="mr-2"
                            onClick={() => {
                                setAccountInformation([...accountInformation, accountInformationObj])
                            }}
                        />

                        <Button
                            buttonType="secondary"
                            title={"Remove"}
                            type='button'
                            onClick={() => {
                                accountInformation.pop()
                                setAccountInformation([...accountInformation])
                            }}
                        />

                    </div>

                </div>

                {accountInformation.map((item: any, index: number) => (<>
                    <div
                        className='w-full flex flex-wrap mt-4'
                        key={index}
                        style={{
                            boxShadow: "#ebebeb 0px 5px 10px 0px",
                            borderRadius: "10px",
                            padding: "15px"
                        }}
                    >

                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>

                            <SelectDropdown
                                cacheOptions
                                asyncSelect={true}
                                isSearchable={true}
                                loadOptions={loadOptions}
                                isClearable={true}
                                required={true}
                                isLoading={isBankListLoad}
                                labeltext="Select Bank"
                                defaultOptions={bankList}
                                onChange={(e: any) => {
                                    item.bankId = e.value
                                    setAccountInformation([...accountInformation])
                                }}
                                placeholder="Select a Bank"
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <SelectDropdown
                                labeltext="Account Type"
                                required={true}
                                options={account_type_dropdown}
                                onChange={(e: any) => {
                                    item.accountType = e.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={account_type_dropdown.filter((io: any) => io.value === item.accountType)}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <SelectDropdown
                                labeltext="Ownership"
                                required={true}
                                options={account_ownership_dropdown}
                                onChange={(e: any) => {
                                    item.ownership = e.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={account_ownership_dropdown.filter((io: any) => io.value === item.ownership)}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <Input
                                type="date"
                                required={true}
                                onChange={(e: any) => {
                                    item.dateReported = e.target.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={item.dateReported}
                                labeltext="Date Reported"
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <SelectDropdown
                                labeltext="Account Status"
                                required={true}
                                options={account_status_dropdown}
                                onChange={(e: any) => {
                                    item.accountStatus = e.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={account_status_dropdown.filter((io: any) => io.value === item.accountStatus)}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <Input
                                type="date"
                                required={true}
                                labeltext="Date Opened"
                                onChange={(e: any) => {
                                    item.dateOpened = e.target.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={item.dateOpened}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <Input
                                type="number"
                                labeltext="Sanction Amount / Highest Credit"
                                placeholder="Enter Sanction Amount"
                                required={true}
                                onChange={(e: any) => {
                                    item.sanctionAmount = e.target.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={item.sanctionAmount}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <Input
                                type="number"
                                labeltext="Current Balance"
                                placeholder="Enter Current Balance"
                                required={true}
                                onChange={(e: any) => {
                                    item.currentBalance = e.target.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={item.currentBalance}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            <Input
                                type="number"
                                labeltext="Amount Overdue"
                                placeholder="Enter Amount Overdue"
                                required={true}
                                onChange={(e: any) => {
                                    item.amountOverdue = e.target.value
                                    setAccountInformation([...accountInformation])
                                }}
                                value={item.amountOverdue}
                            />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                            {/* <SelectDropdown
                                    labeltext="Account Type"
                                    // required={true}
                                    options={[]}
                                /> */}
                        </div>

                    </div>
                </>))}
            </div>
        </form>
    </>)
}

export default CreateLead