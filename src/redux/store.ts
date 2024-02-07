
import { configureStore } from '@reduxjs/toolkit'
import Static from "./actions-reducers/static/static"
import Auth from "./actions-reducers/auth/auth"
import Bank from "./actions-reducers/bank/bank"
import Leads from "./actions-reducers/leads/leads"
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        Static,
        Auth,
        Bank,
        Leads
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger, sagaMiddleware)

})

// then run the saga
sagaMiddleware.run(rootSaga)