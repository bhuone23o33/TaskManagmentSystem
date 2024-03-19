import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService.js";


// getting logged in user from local storage
const employee = JSON.parse(localStorage.getItem('employee'));
const initialState = {
    employee: employee ? employee : null,
    isLoadingEmployee: false,
    isErrorEmployee: false,
    isSuccessEmployee: false,
    messageEmployee: ''
}


// for employee login data to backend
export const employeeLogin = createAsyncThunk('employee/employee/login', async (user, thunkAPI) => {
    try {
        return await employeeService.employeeLogin(user);
    } catch (error) {
        const messageEmployee = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(messageEmployee);
    }
})



// for logout user 
export const logoutEmployee = createAsyncThunk('employee/logout', async () => {
    await employeeService.logout();
})





export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        resetEmployee: (state) => {
            state.isErrorEmployee = false
            state.isLoadingEmployee = false
            state.isSuccessEmployee = false
            state.messageEmployee = ''
        }
    },
    extraReducers: (builder) => {
        builder

            // login employee
            .addCase(employeeLogin.pending, (state) => {
                state.isLoadingEmployee = true
            })
            .addCase(employeeLogin.fulfilled, (state, action) => {
                state.isLoadingEmployee = false
                state.isSuccessEmployee = true
                state.employee = action.payload
            })
            .addCase(employeeLogin.rejected, (state, action) => {
                state.isLoadingEmployee = false
                state.messageEmployee = action.payload
                state.isErrorEmployee = true
                state.employee = null
            })
            // logout user
            .addCase(logoutEmployee.fulfilled, (state) => {
                state.employee = null
            })
    }
})

export const { resetEmployee } = employeeSlice.actions
export default employeeSlice.reducer