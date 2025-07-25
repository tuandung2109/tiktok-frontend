import React, { useState, useEffect, useRef } from 'react';
import './EditProfileModal.scss';
import axios from 'axios';

export default function EditProfileModal({ user, onClose, onSave }) {
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
    const [username, setUsername] = useState(user?.username || '');
    const [name, setName] = useState(user?.username || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        setAvatarUrl(user?.avatar || '');
        setUsername(user?.username || '');
        setName(user?.username || '');
        setBio(user?.bio || '');
        setImageFile(null);
        setError('');
    }, [user]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Kích thước ảnh không được vượt quá 5MB.');
                setImageFile(null);
                setAvatarUrl(user?.avatar || '');
                return;
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                setError('Chỉ chấp nhận định dạng ảnh JPG, PNG hoặc GIF.');
                setImageFile(null);
                setAvatarUrl(user?.avatar || '');
                return;
            }

            setError('');

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = async () => {
        setUploading(true);
        setError('');
        let newAvatarUrl = avatarUrl;

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("upload_preset", "tiktok"); // ✅ preset Cloudinary của bạn

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dh2gw9dju/image/upload",
                    formData
                );
                newAvatarUrl = response.data.secure_url;
                localStorage.setItem('user', JSON.stringify({ ...user, avatarUrl: newAvatarUrl }));
            }

            onSave({
                avatarUrl: newAvatarUrl,
                username,
                name,
                bio,
            });
        } catch (err) {
            console.error('❌ Lỗi khi lưu profile:', err);
            setError('Đã có lỗi xảy ra khi lưu profile. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="edit-profile-modal">
                <div className="modal-header">
                    <h2>Edit profile</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}

                <div className="modal-content-scrollable">
                    <div className="form-section">
                        <label className="section-title">Profile photo</label>
                        <div className="avatar-upload-area">
                            <img className="avatar-preview" src={avatarUrl} alt="avatar" />
                            <button className="edit-avatar-button" onClick={handleAvatarClick}>
                                <span className="edit-icon">✎</span>
                            </button>
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/gif"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <label className="section-title">Username</label>
                        <div className="form-group">
                            <input value={username} onChange={(e) => setUsername(e.target.value)} />
                            <small>www.tiktok.com/@{username}</small>
                            <p className="note">Usernames can only contain letters, numbers, underscores, and periods.</p>
                        </div>
                    </div>

                    <div className="form-section">
                        <label className="section-title">Name</label>
                        <div className="form-group">
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                            <p className="note">Your nickname can only be changed once every 7 days.</p>
                        </div>
                    </div>

                    <div className="form-section">
                        <label className="section-title">Bio</label>
                        <div className="form-group">
                            <textarea value={bio} maxLength={80} onChange={(e) => setBio(e.target.value)} />
                            <p className="char-count">{bio.length}/80</p>
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose} disabled={uploading}>
                        Cancel
                    </button>
                    <button className="save-btn" onClick={handleSave} disabled={uploading}>
                        {uploading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
