import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL



// login admin
const employeeLogin = async (userData) => {
    // console.log(userData);
    const response = await axios.post(`${API_URL}/employee/login`, userData);

    if (response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data));
    }
    return response.data;
}






// logout admin

const logout = () => localStorage.removeItem('employee');

const employeeService = {
    logout, employeeLogin
}

// admin login


export default employeeService;