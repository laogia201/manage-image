import React, { useState } from 'react';
import './style.css';
import folderIcon from '../../assets/folder.png';
import MoreFolder from '../Tools/MoreFolder';

function Folder({ name, folder_id, onClick, viewtype = 'list', isOpenMore, onToggleMore, onUpdateFolderName, onDeleteFolder }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setNewName(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
            onUpdateFolderName(folder_id, newName);
        }
    };

    return (
        <div
            className={`folder ${viewtype === 'list' ? 'folder-list' : 'folder-grid'}`}>
            {isOpenMore && !isEditing && (
                <div className="more-folder">
                    <MoreFolder
                        folder_id={folder_id}
                        folder_name={newName}
                        onEdit={handleEditClick}
                        onDelete={() => onDeleteFolder(folder_id)}
                    />
                </div>
            )}
            <div className="folder-icon-container">
                {viewtype === 'list' ? (
                    <span className='more-action-list' onClick={() => onToggleMore(folder_id)}>
                        <i className="bi bi-three-dots-vertical"></i>
                    </span>
                ) : (
                    <span className='more-action-grid' onClick={() => onToggleMore(folder_id)}>
                        <i className="bi bi-three-dots-vertical"></i>
                    </span>
                )}
                <img src={folderIcon} alt="Folder Icon" className="folder-icon" onClick={() => onClick(folder_id,name)} />
                {isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="folder-name-input"
                        autoFocus
                    />
                ) : (
                    <span className="folder-name">{name || 'Thư mục rỗng'}</span>
                )}
            </div>
            {viewtype === 'list' && (
                <span><i className="bi bi-chevron-right"></i></span>
            )}
        </div>
    );
}

export default Folder;