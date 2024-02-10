
import { hideLoader } from '@/utils/utils';
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

// Define the type for your bank list and any other data you expect in the state
interface LeadsState {
    leadList: any[]; // Specify a more specific type instead of any if possible
    leadData: any[];
    leadListLoad: boolean;
    leadListTotalCount: number;
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
    totalCount: number
}


const initialLeadsState: LeadsState = {
    leadList: [],
    leadData: [],
    leadListLoad: false,
    leadListTotalCount: 0
};

export const Leads = createSlice({
    name: 'Leads',
    initialState: initialLeadsState,
    reducers: {
        handleGetLeadsDataRequest: (state, action: PayloadAction<GetLeadsDataRequestPayload>) => {
            // Your logic here
            state.leadListLoad = true
        },
        handleGetLeadsDataResponse: (state, action: PayloadAction<GetLeadsDataResponsePayload>) => {

            state.leadListLoad = false
            if (action.payload) {
                const { data, totalCount } = action.payload;
                if (Array.isArray(data) && data.length > 0) {
                    state.leadList = data;
                    state.leadListTotalCount = totalCount
                } else {
                    state.leadList = []
                    state.leadListTotalCount = 0
                }
            }
        },
        handleGetSingleLeadsDataResponse: (state, action: PayloadAction<GetLeadsDataResponsePayload>) => {

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