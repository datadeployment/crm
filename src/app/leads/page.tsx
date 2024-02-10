"use client"
import Button from '@/components/Button';
import SelectDropdown from '@/components/SelectDropdown';
import Input from '@/components/input';
import { handleGetLeadsDataRequest } from '@/redux/actions-reducers/leads/leads';
import { handleNavigation } from '@/utils/utils';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect, ReactElement, useCallback } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import toast from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineRemoveRedEye, MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { personalInformationName } from './LeadFormData';

const Leads = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { account_type_dropdown, account_ownership_dropdown, account_status_dropdown, gender_dropdown, loan_agreement_status } = useSelector((state: any) => state.Static)
    const { user_data } = useSelector((state: any) => state.Auth)
    const { leadList, leadListLoad, leadListTotalCount } = useSelector((state: any) => state.Leads)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [searchState, setSearchState] = useState("")
    const [selectedRows, setSelectedRows] = useState([])
    const [dateRangeFilter, setDateRangeFilter] = useState<{
        fromDate: string;
        toDate: string;
    }>({
        fromDate: "",
        toDate: ""
    })
    const [filterPair, setFilterPair] = useState<{
        filterKeyName: string;
        filterKeyValue: string;
    }>({
        filterKeyName: "",
        filterKeyValue: ""
    })
    const [filterParams, setFilterParams] = useState<{
        currentPage: number;
        perPage: number;
        sort?: string;
        keyName?: string;
        filterKeyName?: string;
        filterKeyValue?: string;
    }>({
        currentPage: 1,
        perPage: 10
    })
    const [assignUserData, setAssignUserData] = useState([])
    const [flag, setFlag] = useState(false)

    const handleReset = () => {
        setFilterParams({
            currentPage: 1,
            perPage: 10
        })
        setResetPaginationToggle(!resetPaginationToggle)
        setSearchState("")
        setFilterPair({
            filterKeyName: "",
            filterKeyValue: ""
        })
        setDateRangeFilter({
            fromDate: "",
            toDate: ""
        })
        setSelectedRows([])
    }

    function debounce<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => void {
        let timer: ReturnType<typeof setTimeout> | null = null;
        return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
            const context = this;
            if (timer !== null) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    }


    const handleLeadListApiCall = (props: any) => {
        dispatch(handleGetLeadsDataRequest({
            ...props
        }))
    }

    const handleDebounceLeadListApiCall = useCallback(debounce(handleLeadListApiCall), []);

    useEffect(() => {
        handleDebounceLeadListApiCall({ ...filterParams })
    }, [flag, filterParams])

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
            sortable: true,
            sortField: "name",
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
            sortable: true,
            sortField: "dob",
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
            sortable: true,
            sortField: "createdAt",
            selector: (row: DataRow) => moment(row.createdAt * 1000).format("DD-MMM-YYYY"),
        },
        {
            name: 'Updated At',
            center: true,
            sortable: true,
            sortField: "updatedAt",
            selector: (row: DataRow) => moment(row.updatedAt * 1000).format("DD-MMM-YYYY"),
        },
        {
            name: 'Action',
            center: true,
            cell: (row: any): React.ReactNode => (
                <div className='flex'>
                    <FaRegEdit size={20} className='mr-2 text-primary1 cursor-pointer'
                        onClick={() => {
                            handleNavigation({ path: `/leads/update?leadId=${row.id}`, router })
                        }}
                    />
                    <MdDeleteOutline size={23} className='mr-2 text-primary1 cursor-pointer'
                        onClick={() => {
                            handleDeleteLead({ row })
                        }}
                    />
                    <MdOutlineRemoveRedEye size={23} className='mr-2 text-primary1 cursor-pointer'
                        onClick={() => {
                            handleNavigation({ path: `/leads/view?leadId=${row.id}`, router })
                        }}
                    />
                    <MdOutlineEmail size={23} className='mr-2 text-primary1 cursor-pointer' />


                </div>
            ),
        }
    ];

    // console.log(router.query); // Alerts 'Someone'

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setFilterParams({
            ...filterParams,
            currentPage: page,
            perPage: newPerPage
        })
    };

    const handlePageChange = (newPage: number) => {
        setFilterParams({
            ...filterParams,
            currentPage: newPage
        })
    };



    const handleSort = async (column: any, sortDirection: string) => {
        setFilterParams({
            ...filterParams,
            sort: sortDirection.toUpperCase(),
            keyName: column.sortField
        })
    };

    const actionsMemo = React.useMemo(() => {
        return (
            <div className='flex'>
                <div>
                    <Input
                        type="text"
                        onChange={(e: any) => {
                            const value = e.target.value
                            if (value) {
                                handleDebounceLeadListApiCall({ ...filterParams, search: value })
                                setSearchState(value)
                            } else {
                                handleReset()
                            }
                        }}
                        value={searchState}
                        placeholder="search..."
                    />
                </div>
                <div className='bg-primary2 text-primary3 flex items-center px-3 rounded cursor-pointer border-2 border-primary1'
                    onClick={() => {
                        if (searchState) {
                            handleReset()
                        }
                    }}
                >
                    <CgClose size={25} />
                </div>
            </div>
        );
    }, [resetPaginationToggle, searchState]);

    useEffect(() => {
        if (Object.values(dateRangeFilter).join("").length > 0) {
            handleDebounceLeadListApiCall({ currentPage: 1, perPage: 10, ...dateRangeFilter })
        }
    }, [dateRangeFilter])


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

        <div style={{ boxShadow: "#d9d9d9 5px 4px 10px 10px", borderRadius: "10px", borderColor: "white", borderWidth: "6px" }}
            className='bg-white mt-12'
        >
            <div
                className='w-full flex flex-wrap mt-4'
            >

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <Input
                        type="date"
                        labeltext="From Date"
                        onChange={(e: any) => {
                            setDateRangeFilter({ ...dateRangeFilter, fromDate: e.target.value })
                        }}
                        value={dateRangeFilter.fromDate}
                    />
                </div>

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <Input
                        type="date"
                        labeltext="To Date"
                        onChange={(e: any) => {
                            setDateRangeFilter({ ...dateRangeFilter, toDate: e.target.value })
                        }}
                        value={dateRangeFilter.toDate}
                    />
                </div>

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <Input
                        type="date"
                        labeltext="Date of Birth"
                        onChange={(e: any) => {
                            if (e) {
                                if (e.target.value) {
                                    setFilterParams({ ...filterParams, filterKeyName: "dob", filterKeyValue: e.target.value })
                                    return
                                }
                            }
                            handleReset()
                        }}
                        value={filterParams.filterKeyName === "dob" && filterParams.filterKeyValue}
                    />
                </div>
                {user_data && user_data.user_role && user_data.user_role === 1 && (<>
                    <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                        <SelectDropdown
                            options={assignUserData}
                            labeltext="Assign User"
                            onChange={(e: any) => {
                                if (e) {
                                    if (e.id) {
                                        setFilterParams({ ...filterParams, filterKeyName: "assignUser", filterKeyValue: e.id })
                                        return
                                    }
                                }
                                handleReset()
                            }}
                            value={filterParams.filterKeyName === "assignUser" && assignUserData.filter((io: any) => io.id === filterParams.filterKeyValue)}
                        />
                    </div>
                </>)}

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <SelectDropdown
                        options={loan_agreement_status}
                        isSearchable={true}
                        isClearable={true}
                        labeltext="Loan Agreement Status"
                        onChange={(e: any) => {
                            if (e) {
                                if (e.value) {
                                    setFilterParams({ ...filterParams, filterKeyName: "loanAgreementStatus", filterKeyValue: e.value })
                                    return
                                }
                            }
                            handleReset()
                        }}
                        value={filterParams.filterKeyName === "loanAgreementStatus" && loan_agreement_status.filter((io: any) => io.value === filterParams.filterKeyValue)}
                    />
                </div>

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <SelectDropdown
                        options={gender_dropdown}
                        isSearchable={true}
                        isClearable={true}
                        labeltext="Gender Dropdown"
                        onChange={(e: any) => {
                            if (e) {
                                if (e.value) {
                                    setFilterParams({ ...filterParams, filterKeyName: "gender", filterKeyValue: e.value })
                                    return
                                }
                            }
                            handleReset()
                        }}
                        value={filterParams.filterKeyName === "gender" && gender_dropdown.filter((io: any) => io.value === filterParams.filterKeyValue)}
                    />
                </div>

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <SelectDropdown
                        options={personalInformationName}
                        isSearchable={true}
                        isClearable={true}
                        labeltext="Select Field"
                        onChange={(e: any) => {
                            if (e) {
                                if (e.value) {
                                    setFilterPair({ ...filterPair, filterKeyName: e.value })
                                    return
                                }
                            }
                            setFilterPair({ ...filterPair, filterKeyName: "" })

                        }}
                        value={personalInformationName.filter((io: any) => io.value === filterPair.filterKeyName)}
                    />
                </div>

                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 mt-6 md:mt-6 lg:mt-0 xl:mt-0'>
                    <Input
                        type="text"
                        labeltext="Enter Field Value"
                        onChange={(e: any) => {
                            setFilterPair({ ...filterPair, filterKeyValue: e.target.value })
                        }}
                        value={filterPair.filterKeyValue}
                        placeholder="Enter Field Value"
                    />
                </div>
            </div>
            <div className='flex justify-between my-4 mx-3'>
                <div>

                    <Button
                        type="button"
                        buttontype="primary"
                        title="Search"
                        className="mr-2"
                        onClick={() => {
                            handleDebounceLeadListApiCall({ currentPage: 1, perPage: 10, ...filterPair })
                        }}
                    />
                    <Button
                        type="button"
                        buttontype="secondary"
                        title="Reset"
                        onClick={() => handleReset()}
                    />
                </div>
                <div>
                    <Button
                        type="button"
                        buttontype="primary"
                        title="Delete"
                        // className=""
                        onClick={async () => {
                            try {
                                const ids = selectedRows.map((io: any) => io.id)
                                if (ids.length > 0) {
                                    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
                                        method: "DELETE",
                                        body: JSON.stringify({ id: ids })
                                    });
                                    const jsonData: any = await response.json()
                                    if (jsonData) {
                                        if (jsonData.status_code === 200) {
                                            toast.success(jsonData.message)
                                            handleReset()
                                        } else {
                                            toast.error(jsonData.message)
                                        }
                                    } else {
                                        toast.error("Something went wrong")
                                    }
                                } else {
                                    toast.error("Please select atleast one record.")
                                }
                            } catch (error: any) {
                                toast.error(error.message)
                            }
                        }}
                    />
                </div>
            </div>
        </div>

        <div className='mt-6'>
            <div style={{ boxShadow: "#d9d9d9 5px 4px 10px 10px", borderRadius: "10px", borderColor: "white", borderWidth: "6px" }}>
                <DataTable
                    title="Lead List"
                    columns={columns}
                    progressPending={leadListLoad}
                    data={leadList}
                    selectableRows={true}
                    onSelectedRowsChange={(row: any) => {
                        setSelectedRows(row.selectedRows)
                    }}
                    pagination={true}
                    paginationServer={true}
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    paginationTotalRows={leadListTotalCount}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationRowsPerPageOptions={[10, 15, 20, 50, 100]}
                    persistTableHead={true}
                    onSort={handleSort}
                    sortServer={true}
                    actions={actionsMemo}
                />
            </div>
        </div>

    </>)
}

export default Leads
