import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import projectReducer from '../features/Projects/projectSlice.js'
import managerReducer from '../features/manager/managerSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        manager: managerReducer
    },
})