
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '@/constant';
import toast from 'react-hot-toast';
import { hideLoader, showLoader } from '@/utils/utils';

function* handleGetUserDataRequest(): Generator<any, void, Response> {
    try {
        showLoader()
        const response: Response = yield call(fetch, `${API_URL}/auth/get-user-data`, {
            method: "GET"
        });
        const jsonData: any = yield call([response, 'json']);
        if (jsonData) {
            if (jsonData.status_code === 200) {
                yield put({ type: "Auth/handleGetUserDataResponse", data: jsonData.data });
                return;
            }
            // toast.error("User data isn't fetch!");

            yield put({ type: "Auth/handleGetUserDataResponse", data: null });
        } else {

            toast.error("Something went wrong");
        }
    } catch (err: any) {
        hideLoader()
        // toast.error(`${err.message} - get-user-data/`);
        // Optionally, handle the error in Redux store
        // yield put({ type: "Auth/error", error: err.message });
    }
}

export function* authSaga(): Generator<any> {
    yield takeEvery('Auth/handleGetUserDataRequest', handleGetUserDataRequest);
}
