
import { hideLoader } from '@/utils/utils';
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

// Define the type for your bank list and any other data you expect in the state
interface BankState {
    bankList: any[]; // Specify a more specific type instead of any if possible
}

// Define the type for the payload of your actions
interface GetBankDataRequestPayload {
    currentPage: number;
    perPage: number;
    search?: string;
}

// Optionally, define the type for the response payload
interface GetBankDataResponsePayload {
    data: any[]; // Specify a more specific type instead of any if possible
}


const initialBankState: BankState = {
    bankList: [],
};

export const Bank = createSlice({
    name: 'Bank',
    initialState: initialBankState,
    reducers: {
        handleGetBankDataRequest: (state, action: PayloadAction<GetBankDataRequestPayload>) => {
            // Your logic here
        },
        handleGetBankDataResponse: (state, action: PayloadAction<GetBankDataResponsePayload>) => {
            hideLoader()
            const { data } = action.payload;
            if (Array.isArray(data) && data.length > 0) {
                state.bankList = data;
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    handleGetBankDataRequest,
} = Bank.actions

export default Bank.reducer