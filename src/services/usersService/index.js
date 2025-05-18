import axios from 'axios';

const API_BASE_URL = 'https://manage-image.infinityfreeapp.com/manage/pages';

export const login = async ({username, password}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/login.php`, {username, password},{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};

export const checkLogin = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/check_login.php`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};

export const Register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/register.php`, userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Register API error:', error);
        throw error;
    }
};

export const editUser = async (updatedData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/edit_user.php`, updatedData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Edit User API error:', error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/get_user.php`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Get User API error:', error);
        throw error;
    }
};

export const deleteUser = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/delete_user.php`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Get User API error:', error);
        throw error;
    }
};