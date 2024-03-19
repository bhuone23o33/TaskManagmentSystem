import axios from "axios";


const API_URL = 'http://localhost:5000/api'

// create new project
const createProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/admin/addProject`, projectData, config);
    return response.data;

}

// get projects
const getProjects = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get(`${API_URL}/admin/project/all`, config);

    return response.data;

}

// get manager projects
const getManagerProjects = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get(`${API_URL}/manager/getProject/all`, config);

    return response.data;

}

// del project
const delProject = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.delete(`${API_URL}/admin/deProject/${id}`, config);


    return { projectId: id, ...response.data };

}
// assign project
const assignProject = async (id, projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.put(`${API_URL}/admin/upProject/${id}`, projectData, config);


    return response.data;

}
// assign project to employee
const assignManagerProject = async (id, projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.put(`${API_URL}/manager/upProject/${id}`, projectData, config);


    return response.data;

}

const projectService = {
    createProject, getProjects, getManagerProjects, delProject, assignProject, assignManagerProject
}

export default projectService;