import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService.js";



const initialState = {
    projects: [],
    isLoading: null,
    isError: null,
    isSuccess: null,
    message: ''
}

// create new ticket
export const createProject = createAsyncThunk('Projects/create',
    async (projectData, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await projectService.createProject(projectData, token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })






export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        reset: (state) => {
            state.projects = []
            state.isLoading = null
            state.isError = null
            state.isSuccess = null
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                state.message = action.payload
            })

    }
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer