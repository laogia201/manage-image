import axios from 'axios';

const API_BASE_URL = 'https://manage-image.infinityfreeapp.com/manage/pages'; // Replace with your actual API base URL

export const addFolder = async ({folder_name, folder_desc}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/folders/add_folder.php`, {folder_name, folder_desc}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding folder:', error);
        throw error;
    }
};

export const editFolder = async ({folder_id, folder_name, folder_desc=''}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/folders/edit_folder.php`, {folder_id, folder_name, folder_desc}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error editing folder:', error);
        throw error;
    }
};

export const deleteFolder = async (folderId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/folders/delete_folder.php`, { folder_id: folderId }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting folder:', error);
        throw error;
    }
};

export const getAllFolders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/folders/get_all_folder.php`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching folders:', error);
        throw error;
    }
};