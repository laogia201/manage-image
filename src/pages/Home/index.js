import React, { useState, useEffect } from 'react';
import Folder from '../../components/Folder';
import { getAllFolders, editFolder, deleteFolder } from '../../services/foldersService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import './style.css';
import { useNavigate } from 'react-router-dom';
import AddFolder from '../../components/Tools/AddFolder';
import ConfirmDelete from '../../components/Tools/ConfirmDelete';

function Home() {
    // Sử dụng localStorage để lưu trạng thái view
    const [view, setView] = useState(() => localStorage.getItem('home_view') || 'list');
    const [folders, setFolders] = useState([]);
    const [addFolder, setAddFolder] = useState(false);
    const [openFolderId, setOpenFolderId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ open: false, folder_id: null, folder_name: '' });
    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyLogin = async () => {
    //         const isLoggedIn = await checkLogin();
    //         if (isLoggedIn.status === 'error') {
    //             navigate('/');
    //         }
    //     };
    //     verifyLogin();
    // }, [navigate]);

    const fetchFolders = async () => {
        try {
            const response = await getAllFolders();
            if (response.status === 'success') {
                setFolders(response.data);

            } else {
                alertify.error(response.message);
            }
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const handleOnpenFolder = (folderId,name) => {
        navigate(`/images/${name}/${folderId}`);
    }

    const reloadData = () => {
        fetchFolders();
        setAddFolder(false);
    }

    const handleToggleMore = (folder_id) => {
        setOpenFolderId((prev) => (prev === folder_id ? null : folder_id));
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.folder')) {
            setOpenFolderId(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleUpdateFolderName = async (folder_id, newName) => {
        try {
            const response = await editFolder({folder_id:folder_id, folder_name:newName});
            if (response.status === 'success') {
                setFolders((prevFolders) =>
                    prevFolders.map((folder) =>
                        folder.id === folder_id ? { ...folder, name: newName } : folder
                    )
                );
                fetchFolders();
                alertify.success(response.message);
            } else {
                alertify.error(response.message);
            }
        } catch (error) {
            console.error('Error updating folder name:', error);
        }
    };

    const handleDeleteFolder = (folder_id) => {
        const folder = folders.find(f => f.id === folder_id);
        setConfirmDelete({ open: true, folder_id, folder_name: folder ? folder.name : '' });
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteFolder(confirmDelete.folder_id);
            if (response.status === 'success') {
                alertify.success(response.message);
                fetchFolders();
            } else {
                alertify.error(response.message);
            }
        } catch (error) {
            alertify.error('Lỗi khi xóa thư mục.');
            console.error('Error deleting folder:', error);
        }
        setConfirmDelete({ open: false, folder_id: null, folder_name: '' });
    };

    const handleCancelDelete = () => {
        setConfirmDelete({ open: false, folder_id: null, folder_name: '' });
    };

    // Khi view thay đổi, lưu vào localStorage
    useEffect(() => {
        localStorage.setItem('home_view', view);
    }, [view]);

    return (
        <div className="home-container">
            <center>
                <h2 className="home-title">HDClouds</h2>
            </center>
            <div className="view-buttons">
                <button className="add-button" onClick={() => setAddFolder(!addFolder)}><i className="bi bi-plus"></i></button>
                <div className="view-toggle">
                    <button
                        className={`viewtype-button${view === 'list' ? ' active' : ''}`}
                        onClick={() => setView('list')}
                    >
                        <i className="bi bi-list-task"></i>
                    </button>
                    <button
                        className={`viewtype-button${view === 'grid' ? ' active' : ''}`}
                        onClick={() => setView('grid')}
                    >
                        <i className="bi bi-grid"></i>
                    </button>
                </div>
            </div>

            {addFolder && (
                <AddFolder onFolderAdded={reloadData} />
            )}

            <div className={`folders-container ${view === 'grid' && 'grid-view'}`}>
                {folders && folders.map((folder, index) => (
                    <Folder
                        key={index}
                        name={folder.name}
                        folder_id={folder.id}
                        viewtype={view}
                        onClick={handleOnpenFolder}
                        isOpenMore={openFolderId === folder.id}
                        onToggleMore={handleToggleMore}
                        onUpdateFolderName={handleUpdateFolderName}
                        onDeleteFolder={handleDeleteFolder}
                    />
                ))}
            </div>
            <ConfirmDelete
                open={confirmDelete.open}
                folderName={confirmDelete.folder_name}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default Home;