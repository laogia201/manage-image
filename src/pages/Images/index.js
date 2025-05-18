import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'
import UploadImage from '../../components/Tools/UploadImage'
import ConfirmDelete from '../../components/Tools/ConfirmDelete'
import { getImages, deleteImage as deleteImageApi } from '../../services/imagesSevice'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
alertify.set('notifier', 'position', 'top-right');

function Images() {
    const IMAGE_HOST = 'http://localhost/manage/';
    const { folderName, folderId } = useParams();
    // Lấy trạng thái view từ localStorage, mặc định là 'list'
    const [view, setView] = useState(() => localStorage.getItem('images_view') || 'list');
    const [showUpload, setShowUpload] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // State cho xem ảnh lớn
    const [showViewer, setShowViewer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideshow, setSlideshow] = useState(false);
    const slideshowRef = useRef();

    // Dữ liệu ảnh lấy từ API
    const [imageList, setImageList] = useState([]);

    const fetchImages = async (folderId) => {
        try {
            const response = await getImages(folderId);
            setImageList(response.data);
        } catch {
            setImageList([]);
        }
    };

    // Fetch ảnh từ API khi folderId thay đổi, dùng imagesService với try-catch
    useEffect(() => {
        if (!folderId) return;
        fetchImages(folderId);
    }, [folderId]);

    // Khi view thay đổi, lưu vào localStorage
    useEffect(() => {
        localStorage.setItem('images_view', view);
    }, [view]);

    // Xử lý mở viewer
    const openViewer = (idx) => {
        if (!Array.isArray(imageList) || imageList.length === 0) return;
        setCurrentIndex(idx);
        setShowViewer(true);
        setSlideshow(false);
    };

    // Xử lý chuyển ảnh
    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
    };
    const nextImage = () => {
        setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
    };

    // Xử lý xóa ảnh
    const handleDeleteClick = () => {
        // Mở hộp thoại xác nhận xóa ảnh
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirm(false);
        const img = imageList[currentIndex];
        if (!img || !img.id) return;
        try {
            const response = await deleteImageApi(img.id);
            if (response.status === 'success') {
                alertify.success(response.message);
            } else {
                alertify.error(response.message);
            }
            const newList = imageList.filter((_, idx) => idx !== currentIndex);
            setImageList(newList);
            if (newList.length === 0) {
                setShowViewer(false);
            } else if (currentIndex >= newList.length) {
                setCurrentIndex(newList.length - 1);
            }
        } catch (e) {
            console.log('Xóa ảnh thất bại!');
        }
    };

    // Xử lý trình chiếu
    useEffect(() => {
        if (showViewer && slideshow && imageList.length > 0) {
            slideshowRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
            }, 2000);
        } else {
            if (slideshowRef.current) {
                clearInterval(slideshowRef.current);
                slideshowRef.current = null;
            }
        }
        return () => {
            if (slideshowRef.current) {
                clearInterval(slideshowRef.current);
                slideshowRef.current = null;
            }
        };
    }, [showViewer, slideshow, imageList]);

    const onUpload = (folderId) =>{
        fetchImages(folderId);
        setShowUpload(false);
    }

    return (
        <div>
            <div className="images-toolbar">
                <button
                    className="upload-btn"
                    onClick={() => setShowUpload(!showUpload)}
                >
                    <i className="bi bi-cloud-arrow-up"></i>
                </button>
                <div>
                    <button
                        className={`list-btn${view === 'list' ? ' active' : ''}`}
                        onClick={() => setView('list')}
                    >
                        <i className="bi bi-list-task"></i>
                    </button>
                    <button
                        className={`grid-btn${view === 'grid' ? ' active' : ''}`}
                        onClick={() => setView('grid')}
                    >
                        <i className="bi bi-grid"></i>
                    </button>
                </div>
            </div>
            {showUpload && (
                <UploadImage onUploaded={()=>onUpload(folderId)} folderId={folderId} onClose={() => setShowUpload(false)} />
            )}

            <h3 className='folder-title-name'>{folderName}</h3>
            <div className={`images-list ${view}`}>
                {(!Array.isArray(imageList) || imageList.length === 0) && (
                    <div style={{ textAlign: 'center', color: '#888', width: '100%', padding: '40px 0' }}>
                        Không có ảnh nào trong thư mục này.
                    </div>
                )}
                {Array.isArray(imageList) && imageList.map((img, idx) => (
                    <img
                        key={img.id}
                        src={img.path ? img.path.replace('../../', IMAGE_HOST) + img.name : ''}
                        alt={`img-${img.id}`}
                        className="image-item"
                        onClick={() => openViewer(idx)}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
            {showViewer && Array.isArray(imageList) && imageList.length > 0 && (
                <div className="image-viewer-overlay">
                    <div className="image-viewer">
                        <button className="viewer-close" onClick={() => setShowViewer(false)}>&times;</button>
                        <img
                            src={
                                imageList[currentIndex].path
                                    ? imageList[currentIndex].path
                                        .replace('../../', IMAGE_HOST)
                                        .replace('120x80', '800x600') + imageList[currentIndex].name
                                    : ''
                            }
                            alt=""
                            className="viewer-img"
                        />
                        <div className="viewer-controls">
                            <button onClick={prevImage}><i className="bi bi-chevron-left"></i></button>
                            <button onClick={nextImage}><i className="bi bi-chevron-right"></i></button>
                        </div>
                        <div className="viewer-actions">
                            <button onClick={handleDeleteClick} className="viewer-delete"><i className="bi bi-trash"></i></button>
                            <button onClick={() => setSlideshow((s) => !s)} className="viewer-slideshow">
                                {slideshow ? <i className="bi bi-stop-circle"></i> : <i className="bi bi-cast"></i>}
                            </button>
                        </div>
                        <div className="viewer-index">
                            {currentIndex + 1} / {imageList.length}
                        </div>
                    </div>
                </div>
            )}
            {showConfirm && (
                <ConfirmDelete
                    open={() => setShowConfirm(true)}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowConfirm(false)}
                    imgName={imageList?.[currentIndex]?.name}
                />
            )}
        </div>
    )
}

export default Images