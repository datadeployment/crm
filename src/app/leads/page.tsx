"use client"
import Button from '@/components/Button';
import SelectDropdown from '@/components/SelectDropdown';
import { handleGetLeadsDataRequest } from '@/redux/actions-reducers/leads/leads';
import { handleNavigation } from '@/utils/utils';
import moment from 'moment';
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, ReactElement } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import toast from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineRemoveRedEye, MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

const Leads = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user_data } = useSelector((state: any) => state.Auth)
    const { leadList } = useSelector((state: any) => state.Leads)
    const [assignUserData, setAssignUserData] = useState([])
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        dispatch(handleGetLeadsDataRequest({
            currentPage: 1,
            perPage: 10
        }))
    }, [flag])
    // console.log("leadList", leadList)

    const handleAssignUserData = async () => {
        try {
            const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user?user_role=employee`, {
                method: "GET"
            });
            const jsonData: any = await response.json()
            if (jsonData) {
                if (jsonData.status_code === 200) {
                    setAssignUserData(jsonData.data)
                } else {
                    // toast.error(jsonData.message)
                }
            } else {
                // toast.error("Something went wrong")
            }
        } catch (error: any) {
            // toast.error(error.message)
        }
    }


    useEffect(() => {
        handleAssignUserData()
    }, [])


    console.log("user_data", user_data)
    interface DataRow {
        name: string;
        email: string;
        phone: string;
        dob: string;
        createdAt: number;
        updatedAt: number;

    }
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleDeleteLead = async (props: any) => {
        try {

            const { row } = props
            const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
                method: "DELETE",
                body: JSON.stringify({ id: row.id })
            });
            const jsonData: any = await response.json()
            if (jsonData) {
                if (jsonData.status_code === 200) {
                    toast.success(jsonData.message)
                    setFlag(!flag)
                } else {
                    toast.error(jsonData.message)
                }
            } else {
                toast.error("Something went wrong")
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Name',
            selector: (row: DataRow) => row.name,
        },
        {
            name: 'Email',
            selector: (row: DataRow) => row.email,
        },
        {
            name: 'Phone',
            selector: (row: DataRow) => row.phone,
        },
        {
            name: 'Date of Birth',
            center: true,
            selector: (row: DataRow) => moment(row.dob).format("DD-MMM-YYYY"),
        },
        {
            name: 'Status',
            center: true,
            omit: true,
            cell: (row: DataRow) => {

                const statusDropdown = [
                    {
                        name: "Attempting Contact"
                    },
                    {
                        name: "Contacted"
                    },
                    {
                        name: "Pitched"
                    },
                    {
                        name: "Needs follow up"
                    },
                    {
                        name: "Contract out"
                    },
                    {
                        name: "Deal Closed"
                    },
                ];
                return (<>
                    <div>
                        <div className='flex bg-primary2 text-primary3 rounded-2xl px-4 py-1 cursor-pointer border-2 border-solid border-primary1' onClick={toggleDropdown}>
                            <div className='flex items-center font-bold'>
                                Status
                            </div>
                            <div>
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />

                                </svg>
                            </div>
                        </div>
                        {isOpen === true && (<>

                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {statusDropdown.map((item, index) => (
                                        <div key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">{item.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </>)}
                    </div>
                </>)
            },
        },
        {
            name: 'Assign User',
            center: true,
            omit: user_data ? user_data.user_role ? user_data.user_role === 1 ? false : true : true : true,
            cell: (row: any) => {
                const handleAssignLeadToUser = async (e: any) => {
                    const userId = e.id
                    const leadId = row.id
                    try {
                        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/assign-user`, {
                            method: "POST",
                            body: JSON.stringify({ userId, leadId })
                        });
                        const jsonData: any = await response.json()
                        if (jsonData) {
                            if (jsonData.status_code === 200) {
                                toast.success(jsonData.message)
                                setFlag(!flag)
                            } else {
                                toast.error(jsonData.message)
                            }
                        } else {
                            toast.error("Something went wrong")
                        }
                    } catch (error: any) {
                        toast.error(error.message)
                    }
                }
                return (<>
                    <SelectDropdown
                        options={assignUserData}
                        onChange={(e: any) => {
                            handleAssignLeadToUser(e)
                        }}
                        value={assignUserData.filter((io: any) => io.id === row.assignUser)}
                    />
                </>)
            }
        },
        {
            name: 'Created At',
            center: true,
            selector: (row: DataRow) => moment(row.createdAt * 1000).format("DD-MMM-YYYY"),
        },
        {
            name: 'Updated At',
            center: true,
            selector: (row: DataRow) => moment(row.updatedAt * 1000).format("DD-MMM-YYYY"),
        },
        {
            name: 'Action',
            center: true,
            cell: (row: DataRow): React.ReactNode => (
                <div className='flex'>
                    <FaRegEdit size={20} className='mr-2 text-primary1 cursor-pointer'
                        onClick={() => {
                            handleNavigation({ path: "/leads/update", router, query: { row } })
                        }}
                    />
                    <MdDeleteOutline size={23} className='mr-2 text-primary1 cursor-pointer'
                        onClick={() => {
                            handleDeleteLead({ row })
                        }}
                    />
                    <MdOutlineRemoveRedEye size={23} className='mr-2 text-primary1 cursor-pointer'
                        onClick={() => {
                            handleNavigation({ path: "/leads/view", router, query: { row } })
                        }}
                    />
                    <MdOutlineEmail size={23} className='mr-2 text-primary1 cursor-pointer' />


                </div>
            ),
        }
    ];

    // console.log(router.query); // Alerts 'Someone'

    return (<>

        <div className='flex justify-between'>
            <div className='text-4xl font-bold text-primary1'>Leads</div>
            <Button
                buttontype="primary"
                title={"Create Lead"}
                type='button'
                onClick={() => {
                    handleNavigation({ path: "/leads/create", router })
                }}
            />
        </div>

        {/* <div style={{ boxShadow: "#d9d9d9 5px 4px 10px 10px", borderRadius: "10px", borderColor: "white", borderWidth: "6px" }}>
            <div
                className='w-full flex flex-wrap mt-4'
            >

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>

                </div>
            </div>
        </div> */}

        <div className='mt-12'>
            <div style={{ boxShadow: "#d9d9d9 5px 4px 10px 10px", borderRadius: "10px", borderColor: "white", borderWidth: "6px" }}>
                <DataTable
                    columns={columns}
                    data={leadList}
                    selectableRows
                    pagination
                />
            </div>
        </div>

    </>)
}

export default Leads
