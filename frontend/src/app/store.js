import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import projectReducer from '../features/Projects/projectSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer
    },
})