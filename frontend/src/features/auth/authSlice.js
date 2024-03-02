import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";


// getting logged in user from local storage
const user = JSON.parse(localStorage.getItem('user'));
const manager = JSON.parse(localStorage.getItem('manager'));
const initialState = {
    user: user ? user : null,
    isManagerRegistered: false,
    managers: [],
    isManager: false,
    isDeleted: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// for register data to backend
export const registerAdmin = createAsyncThunk('auth/register/admin', async (user, thunkAPI) => {
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
// for admin login data to backend
export const AdminLogin = createAsyncThunk('auth/admin/login', async (user, thunkAPI) => {
    try {
        return await authService.adminLogin(user);
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message);
    }
})

// for register manager to backend
export const registerManager = createAsyncThunk('auth/register/manager', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.registerManager(user, token);
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message);
    }
})
// getting manager list
export const getManagers = createAsyncThunk('auth/manager/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.getManagers(token);
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message);
    }
})

// getting manager list
export const delManager = createAsyncThunk('auth/manager/del', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.delManager(id, token);
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





export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isManagerRegistered = false
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.isDeleted = false
            state.isManager = false
            state.message = ''
            state.managers = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAdmin.pending, (state) => {
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
            // register manager
            .addCase(registerManager.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerManager.fulfilled, (state, action) => {
                state.isLoading = false
                state.isManagerRegistered = true
            })
            .addCase(registerManager.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // getting managers
            .addCase(getManagers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getManagers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isManager = true
                state.managers = action.payload
            })
            .addCase(getManagers.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // delete managers
            .addCase(delManager.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delManager.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeleted = true

                // Find the index of the deleted manager and remove it from the managers array
                const managersCopy = [...state.managers];
                const index = managersCopy.findIndex((manager) => manager._id === action.payload.managerId);
                if (index !== -1) {
                    managersCopy.splice(index, 1);
                    state.managers = managersCopy;
                }
            })
            .addCase(delManager.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // login admin
            .addCase(AdminLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AdminLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(AdminLogin.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                state.user = null
            })
            // logout user
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer