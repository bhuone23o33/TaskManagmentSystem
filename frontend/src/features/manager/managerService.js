import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL



// login admin
const managerLogin = async (userData) => {
    // console.log(userData);
    const response = await axios.post(`${API_URL}/manager/login`, userData);

    if (response.data) {
        localStorage.setItem('manager', JSON.stringify(response.data));
    }
    return response.data;

}
// register employee
const registerEmployee = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.post(`${API_URL}/manager/register/employee`, userData, config);

    return response.data;

}
// get employees
const getEmployees = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get(`${API_URL}/manager/getEmployees`, config);

    // if (response.data) {
    //     localStorage.setItem('manager', JSON.stringify(response.data));
    // }

    return response.data;

}
// del employee
const delEmployee = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.delete(`${API_URL}/manager/delEmployee/${id}`, config);


    return { managerId: id, ...response.data };

}




// logout admin

const logout = () => localStorage.removeItem('manager');

const managerService = {
    logout, managerLogin, registerEmployee, getEmployees, delEmployee
}

// admin login


export default managerService;