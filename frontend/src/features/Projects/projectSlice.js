import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService.js";



const initialState = {
    projects: [],
    isLoading: null,
    isError: null,
    isSuccess: null,
    isProjects: null,
    isAssign: null,
    isProjDeleted: null,
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

// getting project list
export const getProjects = createAsyncThunk('project/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await projectService.getProjects(token);
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message);
    }
})

// deleting Project
export const delProject = createAsyncThunk('auth/project/del', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await projectService.delProject(id, token);
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()

        return thunkAPI.rejectWithValue(message);
    }
})
// assigning Project
export const assigningProject = createAsyncThunk('auth/project/assign', async ([id, projectData], thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await projectService.assignProject(id, projectData, token);
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
        reset1: (state) => {
            state.isLoading = null
            state.isError = null
            state.isSuccess = null
            state.message = ''
            state.isProjects = null
            state.isProjDeleted = null
            state.isAssign = null
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
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isProjects = true
                state.projects = action.payload
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                state.message = action.payload
            })
            .addCase(delProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isProjDeleted = true
                // Find the index of the deleted manager and remove it from the managers array
                const projectsCopy = [...state.projects];
                const index = projectsCopy.findIndex((project) => project._id === action.payload.projectId);
                if (index !== -1) {
                    projectsCopy.splice(index, 1);
                    state.projects = projectsCopy;
                }
            })
            .addCase(delProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                state.message = action.payload
            })
            .addCase(assigningProject.pending, (state) => {
                state.isAssign = true
            })
            .addCase(assigningProject.fulfilled, (state, action) => {
                state.isAssign = false
            })
            .addCase(assigningProject.rejected, (state, action) => {
                state.isAssign = false
                state.isError = true;
                state.message = action.payload
            })

    }
})

export const { reset1 } = projectSlice.actions
export default projectSlice.reducer