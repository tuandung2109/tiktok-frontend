import React, { useState, useRef, useCallback } from 'react';
import './Upload.scss';
import classNames from 'classnames/bind';
import styles from './Upload.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import icons (cần cài đặt react-icons: npm install react-icons)
import { FiUploadCloud, FiTrash2, FiEdit3 } from 'react-icons/fi';

const cx = classNames.bind(styles);

function Upload() {
    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();
    const dropzoneRef = useRef(null); // Ref cho khu vực kéo thả

    const user = JSON.parse(localStorage.getItem('user'));


    // Xử lý khi có file được chọn hoặc kéo thả
    const processFile = (file) => {
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            alert('Vui lòng chỉ chọn tệp video.');
            handleClearVideo(); // Xóa nếu không phải video
        }
    };

    const handleFileChange = (e) => {
        processFile(e.target.files[0]);
    };

    // Xử lý kéo thả: khi file được kéo vào
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.add(cx('drag-over'));
        }
    }, []);

    // Xử lý kéo thả: khi file rời khỏi khu vực
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.remove(cx('drag-over'));
        }
    }, []);

    // Xử lý kéo thả: khi file được thả vào
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.remove(cx('drag-over'));
        }
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    }, []);

    // Xóa video đã chọn
    const handleClearVideo = () => {
        setVideoFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl('');
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

const handleUpload = async () => {
    if (!videoFile) return alert('Vui lòng chọn một tệp video.');

    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('upload_preset', 'tiktok'); // Hoặc preset của bạn
        const cloudinaryRes = await axios.post('https://api.cloudinary.com/v1_1/dh2gw9dju/video/upload', formData);
        const videoUrl = cloudinaryRes.data.secure_url;

        // Gửi video mới về backend
        const res = await axios.post(`${process.env.REACT_APP_API_BASE}/videos`, {
            videoUrl,
            caption,
            hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
            userId: user._id,
        });

        const createdVideo = res.data; // Lấy dữ liệu video vừa tạo, bao gồm _id
        alert('Tải lên thành công! 🎉');

        // ✅ Chuyển hướng về trang Home và truyền ID của video vừa tạo
        navigate('/', { state: { uploadedVideoId: createdVideo._id } });

    } catch (err) {
        console.error(err);
        alert('Đã có lỗi xảy ra khi tải lên. Vui lòng thử lại.');
    } finally {
        setLoading(false);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    }
};

    return (
        <div className={cx('upload-wrapper')}>
            <h2>Tải lên Video của bạn</h2>

            <div className={cx('upload-container')}>
                {/* Cột trái: Kéo thả hoặc Xem trước video */}
                <div className={cx('video-section')}>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        hidden
                    />

                    {!previewUrl ? (
                        <div
                            className={cx('drop-zone')}
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            ref={dropzoneRef}
                        >
                            <FiUploadCloud className={cx('upload-icon')} />
                            <h3>Kéo và thả video vào đây</h3>
                            <p>Hoặc</p>
                            <button className={cx('browse-btn')}>Chọn tệp</button>
                            <p className={cx('file-info')}>MP4 hoặc WebM. Tối đa 10 phút.</p>
                        </div>
                    ) : (
                        <div className={cx('preview-container')}>
                            <video className={cx('preview')} src={previewUrl} controls autoPlay loop muted />
                            <div className={cx('preview-actions')}>
                                <button className={cx('action-btn')} onClick={handleClearVideo}>
                                    <FiTrash2 /> Xóa
                                </button>
                                <button className={cx('action-btn')} onClick={() => fileInputRef.current.click()}>
                                    <FiEdit3 /> Sửa
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cột phải: Form nhập thông tin */}
                <div className={cx('form-section')}>
                    <label htmlFor="caption">Tiêu đề video</label>
                    <input
                        id="caption"
                        type="text"
                        placeholder="Thêm tiêu đề hấp dẫn cho video của bạn..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={150} // Giới hạn ký tự
                    />
                    <span className={cx('char-count')}>{caption.length}/150</span>

                    <label htmlFor="hashtags">Hashtags</label>
                    <input
                        id="hashtags"
                        type="text"
                        placeholder="Ví dụ: #hottrend #xuhuong #vinhphuc"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)}
                    />
                    <p className={cx('hashtag-hint')}>Sử dụng dấu # và cách nhau bởi dấu cách.</p>

                    <button className={cx('upload-btn')} onClick={handleUpload} disabled={loading || !videoFile}>
                        {loading ? 'Đang tải lên...' : 'Đăng tải Video'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Upload;