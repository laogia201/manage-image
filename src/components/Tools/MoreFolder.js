import React from 'react';
import './style.css';

const MoreFolder = ({ folder_id, folder_name, onEdit, onDelete }) => {
    return (
        <div className="more-folder-container">
            <button className="more-folder-button" onClick={onEdit}>
                <i className="bi bi-pencil"></i>
            </button>
            <button className="more-folder-button" onClick={onDelete}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};

export default MoreFolder;