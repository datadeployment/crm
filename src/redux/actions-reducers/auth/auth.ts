
import { hideLoader } from '@/utils/utils'
import { createSlice } from '@reduxjs/toolkit'
const initialAuthState = {
    user_data: null
}

export const Auth = createSlice({
    name: 'Auth',
    initialState: initialAuthState,
    reducers: {
        handleGetUserDataRequest: () => {
            // state.region = payload.payload.region
        },
        handleGetUserDataResponse: (state, payload: any) => {
            hideLoader()
            if (payload && payload.data) {
                const { user_data } = payload.data
                if (user_data) {
                    state.user_data = user_data
                    return
                }
            }
            state.user_data = null
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    handleGetUserDataRequest,
    // handleInstanceTypeDropdownRequest
} = Auth.actions

export default Auth.reducer