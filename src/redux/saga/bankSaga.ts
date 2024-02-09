
import { call, put, takeEvery } from 'redux-saga/effects';

import toast from 'react-hot-toast';
import { hideLoader, showLoader } from '@/utils/utils';
import qs from "qs"
function* handleGetBankDataRequest(payload: any): Generator<any, void, Response> {

    const params = qs.stringify(payload.payload)
    try {
        showLoader()
        const response: Response = yield call(fetch, `${process.env.NEXT_PUBLIC_API_URL}/bank?${params}`, {
            method: "GET"
        });
        const jsonData: any = yield call([response, 'json']);
        if (jsonData) {
            if (jsonData.status_code === 200) {
                yield put({ type: "Bank/handleGetBankDataResponse", payload: jsonData });
                return;
            }
            // toast.error("User data isn't fetch!");

            yield put({ type: "Bank/handleGetBankDataResponse", payload: null });
        } else {

            toast.error("Something went wrong");
        }
    } catch (err: any) {
        hideLoader()
        // toast.error(`${err.message} - get-user-data/`);
        // Optionally, handle the error in Redux store
        // yield put({ type: "Bank/error", error: err.message });
    }
}

export function* bankSaga(): Generator<any> {
    yield takeEvery('Bank/handleGetBankDataRequest', handleGetBankDataRequest);
}
