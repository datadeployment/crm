import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/SelectDropdown'
import Input from '@/components/input'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetBankDataRequest } from '@/redux/actions-reducers/bank/bank'
import qs from "qs"
import DocumentComponent from './DocumentComponent'
import Button from '@/components/Button'
export const personalInformationName: any = [

    {
        label: "Name",
        value: "name",
        type: "text",
        placeholder: "Enter",
        required: true
    },
    {
        label: "Email",
        value: "email",
        type: "email",
        placeholder: "Enter",
        required: true
    },
    {
        label: "Phone",
        value: "phone",
        type: "number",
        placeholder: "Enter",
        required: true
    },
    {
        label: "Lawyer Name",
        value: "lawyerName",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Description",
        value: "description",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Loan Agreement Status",
        value: "loanAgreementStatus",
        type: "text",
        placeholder: "Select"
    },
    {
        label: "Date of Birth",
        value: "dob",
        type: "date",
        placeholder: "Select"
    },
    {
        label: "Gender",
        value: "gender",
        type: "text",
        placeholder: "Select"
    },
    {
        label: "Credit Score",
        value: "creditScore",
        type: "number",
        placeholder: "Enter"
    },
    {
        label: "Ration Card",
        value: "rationCard",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Address",
        value: "address",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Pan Number",
        value: "pan",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Passport",
        value: "passport",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Telephone",
        value: "telephone",
        type: "number",
        placeholder: "Enter"
    },
    {
        label: "Voter Id",
        value: "voterId",
        type: "text",
        placeholder: "Enter"
    },
    {
        label: "Aadhaar Number",
        value: "aadhaarNumber",
        type: "number",
        placeholder: "Enter"
    },
    {
        label: "Driving License",
        value: "drivingLicense",
        type: "text",
        placeholder: "Enter"
    }
]

interface PersonalInformationType {
    name: string,
    email: string,
    phone: string,
    lawyerName: string,
    description: string,
    loanAgreementStatus: string,
    dob: string,
    gender: string,
    creditScore: string,
    rationCard: string,
    address: string,
    pan: string,
    passport: string,
    telephone: string,
    voterId: string,
    aadhaarNumber: string,
    drivingLicense: string
}

export const accountInformationLabel: any = {
    accountType: "Account Type",
    ownership: "Ownership",
    dateReported: "Date Reported",
    accountStatus: "Account Status",
    dateOpened: "Date Opened",
    sanctionAmount: "Sanction Amount",
    currentBalance: "Current Balance",
    amountOverdue: "Amount Overdue"
}


const LeadFormData = ({ personalInformation, setPersonalInformation, accountInformation, setAccountInformation, accountInformationObj }: { personalInformation: any, setPersonalInformation: any, accountInformation: any, setAccountInformation: any, accountInformationObj: any }) => {
    const dispatch = useDispatch()
    const { bankList } = useSelector((state: any) => state.Bank)
    // const [mainbankl, setmainbankl] = useState(second)
    const { account_type_dropdown, account_ownership_dropdown, account_status_dropdown, gender_dropdown, loan_agreement_status } = useSelector((state: any) => state.Static)
    const router = useRouter()
    const [creditReportFile, setCreditReportFile] = useState("")
    const [isBankListLoad, setIsBankListLoad] = useState(false)
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
            const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank?${params}`, {
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


    return (<>
        <div className='mt-6 bg-white rounded-xl p-4'>
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
                        {item.value === "gender" || item.value === "loanAgreementStatus" ? (

                            <SelectDropdown
                                {...item}
                                onChange={(e: any) => {
                                    if (e) {
                                        setPersonalInformation({ ...personalInformation, [item.value]: e.value })
                                    } else {
                                        setPersonalInformation({ ...personalInformation, [item.value]: "" })
                                    }
                                }}
                                value={
                                    (item.value === "loanAgreementStatus" ? loan_agreement_status : item.value === "gender" ? gender_dropdown : [])
                                        .filter((io: any) => io.value === personalInformation[item.value])
                                }
                                options={(item.value === "loanAgreementStatus" ? loan_agreement_status : item.value === "gender" ? gender_dropdown : [])}
                                isSearchable={true}
                                isClearable={true}
                            />
                        ) : (
                            <Input
                                {...item}
                                onChange={(e: any) => setPersonalInformation({ ...personalInformation, [item.value]: e.target.value })}
                                value={personalInformation[item.value]}
                                placeholder={`${item.placeholder} ${item.label}`}
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
                        buttontype="primary"
                        title={"Add"}
                        type='button'
                        className="mr-2"
                        onClick={() => {
                            setAccountInformation([...accountInformation, accountInformationObj])
                        }}
                    />

                    <Button
                        buttontype="secondary"
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
                            // required={true}
                            isLoading={isBankListLoad}
                            labeltext="Select Bank"
                            defaultOptions={bankList}
                            onChange={(e: any) => {
                                item.bankId = e.value
                                setAccountInformation([...accountInformation])
                            }}
                            value={bankList.filter((io: any) => io.id === item.bankId)}
                            placeholder="Select a Bank"
                        />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                        <SelectDropdown
                            labeltext="Account Type"
                            // required={true}
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
                            // required={true}
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
                            // required={true}
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
                            // required={true}
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
                            // required={true}
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
                            // required={true}
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
                            // required={true}
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
                            // required={true}
                            onChange={(e: any) => {
                                item.amountOverdue = e.target.value
                                setAccountInformation([...accountInformation])
                            }}
                            value={item.amountOverdue}
                        />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    </div>
                </div>
            </>))}
        </div>
    </>)
}

export default LeadFormData
