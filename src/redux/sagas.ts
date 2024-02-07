
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { authSaga } from './saga/authSaga'
import { bankSaga } from './saga/bankSaga'
import { leadSaga } from './saga/leadSaga'
// import { toast } from "react-toastify"
// import config from "config"
// function* handleGetUserDataRequest(e) {
//     try {
//         const response = yield fetch(`${config.host}/auth/get-user-data`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${e.payload.token}`
//             }
//         })
//         const jsonData = yield response.json();
//         if (jsonData) {
//             if (jsonData.status_code === 200) {
//                 yield put({ type: "ComponentPropsManagement/handleGetUserDataResponse", data: jsonData.user_info })
//                 return
//             }
//             toast.error("User data isn't fatch!")
//             yield put({ type: "ComponentPropsManagement/handleGetUserDataResponse", data: null })
//         } else {
//             toast.error("Something went wrong")
//         }
//     } catch (err) {
//         toast.error(`${err.message} - auth/get-user-data`)
//     }
// }

// function* handleGetAllAssignedUsersRequest(e) {
//     try {
//         const response = yield fetch(`${config.host}/auth/get-all-assigned-users`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${e.payload.token}`
//             }
//         })
//         const jsonData = yield response.json();
//         if (jsonData) {
//             if (jsonData.status_code === 200) {
//                 yield put({ type: "ComponentPropsManagement/handleGetAllAssignedUsersResponse", data: jsonData.user_info })
//                 return
//             }
//             toast.error("assigned user data isn't fatch!")
//             yield put({ type: "ComponentPropsManagement/handleGetAllAssignedUsersResponse", data: [] })
//         } else {
//             toast.error("Something went wrong")
//         }
//     } catch (err) {
//         toast.error(`${err.message} - auth/get-all-assigned-users`)
//     }
// }

// function* getAllCountryListRequest(e) {
//     try {
//         const headers = new Headers();
//         headers.append("X-CSCAPI-KEY", config.country_state_city_api_key);
//         const response = yield fetch(`https://api.countrystatecity.in/v1/countries`, {
//             method: "GET",
//             headers: headers,
//             redirect: 'follow'
//         })
//         const jsonData = yield response.json();
//         if (jsonData && jsonData.length > 0) {
//             yield put({ type: "ComponentPropsManagement/getAllCountryListResponse", data: jsonData })
//             return
//         } else {
//             toast.error("Country list api data isn't fatched!")
//             yield put({ type: "ComponentPropsManagement/getAllCountryListResponse", data: [] })
//         }
//     } catch (err) {
//         toast.error(`${err.message} - /countries`)
//     }
// }

// function* handleStateDropdownRequest(e) {
//     try {
//         const { country_id } = e.payload
//         const headers = new Headers();
//         headers.append("X-CSCAPI-KEY", config.country_state_city_api_key);
//         const response = yield fetch(`https://api.countrystatecity.in/v1/countries/${country_id}/states`, {
//             method: "GET",
//             headers: headers,
//             redirect: 'follow'
//         })
//         const jsonData = yield response.json();
//         if (jsonData && jsonData.length > 0) {
//             yield put({ type: "ComponentPropsManagement/handleStateDropdownResponse", data: jsonData })
//             return
//         } else {
//             toast.error("state list api data isn't fatched!")
//             yield put({ type: "ComponentPropsManagement/handleStateDropdownResponse", data: [] })
//         }
//     } catch (err) {
//         toast.error(`${err.message} - /states`)
//     }
// }

// function* handleCityDropdownRequest(e) {
//     try {
//         const { country_id, state_id } = e.payload
//         const headers = new Headers();
//         headers.append("X-CSCAPI-KEY", config.country_state_city_api_key);
//         const response = yield fetch(`https://api.countrystatecity.in/v1/countries/${country_id}/states/${state_id}/cities`, {
//             method: "GET",
//             headers: headers,
//             redirect: 'follow'
//         })
//         const jsonData = yield response.json();
//         if (jsonData && jsonData.length > 0) {
//             yield put({ type: "ComponentPropsManagement/handleCityDropdownResponse", data: jsonData })
//             return
//         } else {
//             toast.error("city list api data isn't fatched!")
//             yield put({ type: "ComponentPropsManagement/handleCityDropdownResponse", data: [] })
//         }
//     } catch (err) {
//         toast.error(`${err.message} - /cities`)
//     }
// }

// function* handleGetLeadListRequest(e) {
//     try {
//         const response = yield fetch(`${config.host}/leads/`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${e.payload.token}`
//             }
//         })
//         const jsonData = yield response.json();
//         if (jsonData) {
//             if (jsonData.status_code === 200) {
//                 yield put({ type: "ComponentPropsManagement/handleGetLeadListResponse", data: jsonData })
//                 return
//             }
//             toast.error("assigned user data isn't fatch!")
//             yield put({ type: "ComponentPropsManagement/handleGetLeadListResponse", data: null })
//         } else {
//             toast.error("Something went wrong")
//         }
//     } catch (err) {
//         toast.error(`${err.message} - leads/`)
//     }
// }

export function* helloSaga() {
    // yield takeEvery('ComponentPropsManagement/handleGetUserDataRequest', handleGetUserDataRequest)
    // yield takeEvery('ComponentPropsManagement/handleGetAllAssignedUsersRequest', handleGetAllAssignedUsersRequest)
    // yield takeEvery('ComponentPropsManagement/getAllCountryListRequest', getAllCountryListRequest)
    // yield takeEvery('ComponentPropsManagement/handleStateDropdownRequest', handleStateDropdownRequest)
    // yield takeEvery('ComponentPropsManagement/handleCityDropdownRequest', handleCityDropdownRequest)
    // yield takeEvery('ComponentPropsManagement/handleGetLeadListRequest', handleGetLeadListRequest)



}

export default function* rootSaga() {
    yield all([
        // helloSaga(),
        authSaga(),
        bankSaga(),
        leadSaga()
        // watchIncrementAsync()
    ])
}

// export default saga