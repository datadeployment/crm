"use client"
import Button from '@/components/Button'
import Input from '@/components/input'
import { handleNavigation } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import Select from 'react-select'


const CreateLead = () => {
    const router = useRouter()
    const genderDropdown = [
        { label: 'Male', value: 'Male' },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
    ]
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
    const styles = {
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            borderColor: '#e1e1e1',
            backgroundColor: "#fbfbfb",
            fontSize: "16px",
            padding: "3px"
        })
        // multiValue: (base: any, state: any) => {
        //     return state.data.isFixed ? { ...base, backgroundColor: 'red' } : base;
        // },
        // multiValueLabel: (base: any, state: any) => {
        //     return state.data.isFixed
        //         ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        //         : base;
        // },
        // multiValueRemove: (base: any, state: any) => {
        //     return state.data.isFixed ? { ...base, display: 'none' } : base;
        // },
    };
    return (<>
        <div className='m-4'>
            <div className='flex justify-between'>
                <div className='text-4xl font-bold'>Update Leads</div>
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
                        title={"Update"}
                        type='button'

                    />
                </div>
            </div>
            <div className='mt-8'>
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div className='w-full mr-6'>
                            <Input
                                type="text"
                                labeltext="First Name"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                labeltext="Last Name"
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="email"
                                labeltext="Email"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="number"
                                labeltext="Phone"
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="date"
                                labeltext="Date of birth"
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="gender" className='cursor-pointer block text-xs'>Gender</label>
                            <Select
                                // className="basic-single"
                                // classNamePrefix="select"
                                // defaultValue={colourOptions[0]}
                                // isDisabled={isDisabled}
                                // isLoading={isLoading}
                                // isClearable={isClearable}
                                // isRtl={isRtl}
                                // isSearchable={isSearchable}
                                // name="color"
                                styles={styles}
                                options={genderDropdown}
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="text"
                                labeltext="Credit score"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                labeltext="Ration Card"
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="text"
                                labeltext="Address"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                labeltext="Pan Number"
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="text"
                                labeltext="Passport"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                labeltext="Telephone"
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="text"
                                labeltext="Voter Id"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                labeltext="Aadhaar Number"
                            />
                        </div>
                    </div>

                    <div className='flex mt-6'>
                        <div className='w-full mr-6'>
                            <Input
                                type="text"
                                labeltext="Driving License"
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                labeltext="User Role"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

export default CreateLead
