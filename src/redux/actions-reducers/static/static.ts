
import { createSlice } from '@reduxjs/toolkit'
const initialStaticState = {
    region: "ap-south-1",
    db_engine: "mysql",
    db_engine_version: "8.0.34",
    account_type_dropdown: [
        { label: "Credit Card Accounts", value: "Credit Card Accounts" },
        { label: "Home Loans / Mortgages", value: "Home Loans / Mortgages" },
        { label: "Auto Loans", value: "Auto Loans" },
        { label: "Personal Loans", value: "Personal Loans" },
        { label: "Education Loans", value: "Education Loans" },
        { label: "Consumer Durable Loans", value: "Consumer Durable Loans" },
        { label: "Loans Against Property (LAP)", value: "Loans Against Property (LAP)" },
        { label: "Overdraft Facilities", value: "Overdraft Facilities" },
        { label: "Gold Loans", value: "Gold Loans" },
        { label: "Business Loans", value: "Business Loans" },
        { label: "Microfinance Loans", value: "Microfinance Loans" }
    ],

    account_ownership_dropdown: [
        { label: "Individual", value: "Individual" },
        { label: "Joint", value: "Joint" },
        { label: "Authorized User", value: "Authorized User" },
        { label: "Guarantor", value: "Guarantor" },
        { label: "Co-signer", value: "Co-signer" }
    ],
    account_status_dropdown: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Dormant", value: "Dormant" },
        { label: "Frozen", value: "Frozen" },
        { label: "Closed", value: "Closed" },
        { label: "Overdrawn", value: "Overdrawn" }
    ],
    gender_dropdown: [
        { label: 'Male', value: 'Male' },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
    ]
    // instance_type_dropdown: []
}

export const Static = createSlice({
    name: 'Static',
    initialState: initialStaticState,
    reducers: {
        // handleSetRegionRequest: (state: any, payload: any) => {
        //     state.region = payload.payload.region
        // },
        // handleInstanceTypeDropdownRequest: (state, payload) => {
        //     state.instance_type_dropdown = payload.payload.instance_type_dropdown
        // },
    }
})

// Action creators are generated for each case reducer function
export const {
    // handleSetRegionRequest,
    // handleInstanceTypeDropdownRequest
} = Static.actions

export default Static.reducer