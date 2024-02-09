
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { authSaga } from './saga/authSaga'
import { bankSaga } from './saga/bankSaga'
import { leadSaga } from './saga/leadSaga'


export default function* rootSaga() {
    yield all([
        authSaga(),
        bankSaga(),
        leadSaga()
    ])
}