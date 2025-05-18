import React from 'react';
import './style.css';

const ConfirmDelete = ({ open, onCancel, onConfirm, folderName, imgName }) => {
    if (!open) return null;
    return (
        <div className="confirm-delete-overlay">
            <div className="confirm-delete-box">
                <p>Bạn có chắc chắn muốn xóa <b>{folderName||imgName}</b>?</p>
                <div className="confirm-delete-actions">
                    <button className="confirm-delete-btn confirm" onClick={onConfirm}>Xóa</button>
                    <button className="confirm-delete-btn cancel" onClick={onCancel}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
