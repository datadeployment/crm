
import { hideLoader } from '@/utils/utils';
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

// Define the type for your bank list and any other data you expect in the state
interface LeadsState {
    leadList: any[]; // Specify a more specific type instead of any if possible
    leadData: any[]
}

// Define the type for the payload of your actions
interface GetLeadsDataRequestPayload {
    id?: number,
    currentPage?: number;
    perPage?: number;
    search?: string;
}

// Optionally, define the type for the response payload
interface GetLeadsDataResponsePayload {
    data: any[]; // Specify a more specific type instead of any if possible
}


const initialLeadsState: LeadsState = {
    leadList: [],
    leadData: []
};

export const Leads = createSlice({
    name: 'Leads',
    initialState: initialLeadsState,
    reducers: {
        handleGetLeadsDataRequest: (state, action: PayloadAction<GetLeadsDataRequestPayload>) => {
            // Your logic here
        },
        handleGetLeadsDataResponse: (state, action: PayloadAction<GetLeadsDataResponsePayload>) => {
            hideLoader()
            if (action.payload) {
                const { data } = action.payload;
                if (Array.isArray(data) && data.length > 0) {
                    state.leadList = data;
                }
            }
        },
        handleGetSingleLeadsDataResponse: (state, action: PayloadAction<GetLeadsDataResponsePayload>) => {
            hideLoader()
            if (action.payload) {
                const { data } = action.payload;
                if (Array.isArray(data) && data.length > 0) {
                    state.leadData = data;
                }
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    handleGetLeadsDataRequest,
} = Leads.actions

export default Leads.reducer