import React, { useState } from 'react';
import { addFolder } from '../../services/foldersService';
import './style.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import imageFolder from '../../assets/folder.png';

function AddFolder({onFolderAdded}) {
    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                const response = await addFolder({ folder_name: folderName, folder_desc: folderDescription });
                if (response.status === 'success') {
                    alertify.success(response.message);
                    setFolderName('');
                    setFolderDescription('');
                    if (onFolderAdded) {
                        onFolderAdded();
                    }
                } else {
                    alertify.error(response.message);
                }
            } catch (error) {
                console.error('Error adding folder:', error);
            }
        }
    };

    return (
        <form className="add-folder-form">
            <div className="form-group">
                <img src={imageFolder} alt="Folder Icon" className="folder-icon" />
                <br></br>
                <input
                    type="text"
                    id="folderName"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    required
                    placeholder='New Folder'
                    autoFocus
                />
            </div>
        </form>
    );
}

export default AddFolder;