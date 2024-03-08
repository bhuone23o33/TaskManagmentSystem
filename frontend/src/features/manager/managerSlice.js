import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import managerService from "./managerService.js";


// getting logged in user from local storage
const manager = JSON.parse(localStorage.getItem('manager'));
const initialState = {
    manager: manager ? manager : null,
    isEmployeeRegistered: false,
    employees: [],
    isEmployee: false,
    isDeletedEmployee: false,
    isLoadingManager: false,
    isErrorManager: false,
    isSuccessManager: false,
    messageManager: ''
}


// for manager login data to backend
export const managerLogin = createAsyncThunk('manager/manager/login', async (user, thunkAPI) => {
    try {
        return await managerService.managerLogin(user);
    } catch (error) {
        const messageManager = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(messageManager);
    }
})

// for register manager to backend
export const registerEmployee = createAsyncThunk('manager/register/employee', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().manager.manager.token;
        return await managerService.registerEmployee(user, token);
    } catch (error) {
        const messageManager = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(messageManager);
    }
})
// getting manager list
export const getEmployees = createAsyncThunk('manager/employee/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().manager.manager.token;
        return await managerService.getEmployees(token);
    } catch (error) {
        const messageManager = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(messageManager);
    }
})

// deleting employee from list
export const delEmployee = createAsyncThunk('manager/employee/del', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().manager.manager.token;
        return await managerService.delEmployee(id, token);
    } catch (error) {
        const messageManager = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(messageManager);
    }
})

// for logout user 
export const logoutManager = createAsyncThunk('manager/logout', async () => {
    await managerService.logout();
})





export const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        resetManager: (state) => {
            state.isEmployeeRegistered = false
            state.isErrorManager = false
            state.isLoadingManager = false
            state.isSuccessManager = false
            state.isDeletedEmployee = false
            state.isEmployee = false
            state.messageManager = ''
            state.employees = {}
        }
    },
    extraReducers: (builder) => {
        builder
            // register employee
            .addCase(registerEmployee.pending, (state) => {
                state.isLoadingManager = true
            })
            .addCase(registerEmployee.fulfilled, (state, action) => {
                state.isLoadingManager = false
                state.isEmployeeRegistered = true
            })
            .addCase(registerEmployee.rejected, (state, action) => {
                state.isLoadingManager = false
                state.messageManager = action.payload
                state.isErrorManager = true
            })
            // getting employees
            .addCase(getEmployees.pending, (state) => {
                state.isLoadingManager = true
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.isLoadingManager = false
                state.isEmployee = true
                state.employees = action.payload
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.isLoadingManager = false
                state.messageManager = action.payload
                state.isErrorManager = true
            })
            // delete employees
            .addCase(delEmployee.pending, (state) => {
                state.isLoadingManager = true
            })
            .addCase(delEmployee.fulfilled, (state, action) => {
                state.isLoadingManager = false
                state.isDeletedEmployee = true

                // Find the index of the deleted employees and remove it from the employees array
                const employeesCopy = [...state.employees];
                const index = employeesCopy.findIndex((manager) => manager._id === action.payload.managerId);
                if (index !== -1) {
                    employeesCopy.splice(index, 1);
                    state.employees = employeesCopy;
                }
            })
            .addCase(delEmployee.rejected, (state, action) => {
                state.isLoadingManager = false
                state.messageManager = action.payload
                state.isErrorManager = true
            })
            // login manager
            .addCase(managerLogin.pending, (state) => {
                state.isLoadingManager = true
            })
            .addCase(managerLogin.fulfilled, (state, action) => {
                state.isLoadingManager = false
                state.isSuccessManager = true
                state.manager = action.payload
            })
            .addCase(managerLogin.rejected, (state, action) => {
                state.isLoadingManager = false
                state.messageManager = action.payload
                state.isErrorManager = true
                state.manager = null
            })
            // logout user
            .addCase(logoutManager.fulfilled, (state) => {
                state.manager = null
            })
    }
})

export const { resetManager } = managerSlice.actions
export default managerSlice.reducer