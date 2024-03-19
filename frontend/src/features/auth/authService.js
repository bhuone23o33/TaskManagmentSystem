import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// Register Admin

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/admin/register`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;

}

// login admin
const adminLogin = async (userData) => {
    // console.log(userData);
    const response = await axios.post(`${API_URL}/admin/login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;

}
// register manager
const registerManager = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.post(`${API_URL}/admin/register/manager`, userData, config);

    // if (response.data) {
    //     localStorage.setItem('manager', JSON.stringify(response.data));
    // }

    return response.data;

}
// get managers
const getManagers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get(`${API_URL}/admin/getManagers`, config);

    // if (response.data) {
    //     localStorage.setItem('manager', JSON.stringify(response.data));
    // }

    return response.data;

}
// get employees
const getAllEmployees = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get(`${API_URL}/admin/employee/all`, config);

    // if (response.data) {
    //     localStorage.setItem('manager', JSON.stringify(response.data));
    // }

    return response.data;

}
// del manager
const delManager = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.delete(`${API_URL}/admin/delManager/${id}`, config);


    return { managerId: id, ...response.data };

}
// del employee
const delEmployee = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.delete(`${API_URL}/admin/delEmployee/${id}`, config);


    return { managerId: id, ...response.data };

}




// logout admin

const logout = () => localStorage.removeItem('user');

const authService = {
    register, logout, adminLogin, registerManager, getManagers, delManager, delEmployee, getAllEmployees
}

// admin login


export default authService;