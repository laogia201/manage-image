import React, { useState } from 'react';
import { uploadImages } from '../../services/imagesSevice';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import './UploadImage.css';

function UploadImage({ folderId, onUploaded }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFiles.length) {
            alertify.error('Vui lòng chọn ảnh để upload.');
            return;
        }
        setUploading(true);
        try {
            const response = await uploadImages(folderId, selectedFiles);

            if (response.status === 'success') {
                alertify.success(response.message || 'Upload thành công!');
                setSelectedFiles([]);
                if (onUploaded) onUploaded();
            } else if (response.status === 'partial') {
                alertify.warning(response.message);
                if (response.errors) {
                    response.errors.forEach(err => alertify.error(err));
                }
                setSelectedFiles([]);
                if (onUploaded) onUploaded();
            } else {
                alertify.error(response.message || 'Upload thất bại!');
                if (response.errors) {
                    response.errors.forEach(err => alertify.error(err));
                }
            }
        } catch (error) {
            alertify.error('Lỗi khi upload ảnh.');
        }
        setUploading(false);
    };

    return (
        <form className="upload-image-form" onSubmit={handleUpload}>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="upload-image-input"
            />
            <br />
            <button
                type="submit"
                disabled={uploading}
                className="upload-image-btn"
            >
                {uploading ? 'Đang upload...' : 'Upload'}
            </button>
        </form>
    );
}

export default UploadImage;
