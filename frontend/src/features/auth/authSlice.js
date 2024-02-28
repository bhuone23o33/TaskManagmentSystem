import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";


// getting logged in user from local storage
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// for register data to backend
export const registerAdmin = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message);
    }
})

// for logout user 
export const logoutAdmin = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

// for login data to backend
export const login = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    console.log(user);
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAdmin.pending, (state) => {
            state.isLoading = true
        })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                state.user = null
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer