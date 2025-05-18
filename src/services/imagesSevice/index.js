import axios from 'axios';

const API_BASE_URL = 'https://manage-image.infinityfreeapp.com/manage/pages';

export const uploadImages = async (folderId, files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i]);
    }
    try {
        const response = await axios.post(
            `${API_BASE_URL}/images/add_image.php?id_folder=${folderId}`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Upload Images API error:', error);
        throw error;
    }
};

export const getImages = async (folderId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/images/get_image_by_folder.php?folder_id=${folderId}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Get Images API error:', error);
        throw error;
    }
};

export const deleteImage = async (imageId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/images/delete_image.php`,
            { image_id: imageId },
            { withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
             }
        );
        return response.data;
    } catch (error) {
        console.error('Delete Image API error:', error);
        throw error;
    }
};

export const deleteMultipleImages = async (imageIds) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/images/delete_multiple_images.php`,
            { ids: imageIds },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error('Delete Multiple Images API error:', error);
        throw error;
    }
};
