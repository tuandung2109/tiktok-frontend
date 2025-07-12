import React, { useEffect, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Profile() {
    const [activeTab, setActiveTab] = useState('videos');
    const navigate = useNavigate();

    const [user, setUser] = useState({
        avatar: '/images/avatar.png',
        username: 'loading...',
        bio: '',
        following: 0,
        followers: 0,
        likes: 0,
    });

    const [videos, setVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [favoriteVideos, setFavoriteVideos] = useState([]);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUserId = storedUser?._id;

    const { userId: paramUserId } = useParams();
    const userId = paramUserId || storedUserId;

    // Lấy thông tin user
    useEffect(() => {
        if (!userId) return;
        axios.get(`http://localhost:5000/users/${userId}`)
            .then((res) => {
                const data = res.data;
                setUser((prev) => ({
                    ...prev,
                    avatar: data.avatarUrl || prev.avatar,
                    username: data.username || prev.username,
                    bio: data.bio || '',
                    following: data.following || 0,
                    followers: data.followers || 0,
                    likes: data.likes || 0,
                }));
            })
            .catch((err) => console.error('❌ Lỗi khi lấy thông tin user:', err));
    }, [userId]);

    // Lấy video đã đăng
    useEffect(() => {
        if (!userId) return;
        axios.get(`http://localhost:5000/videos?userId=${storedUserId}&filterByUser=${userId}`)
            .then((res) => setVideos(res.data))
            .catch((err) => console.error('❌ Lỗi khi lấy video:', err));
    }, [userId, storedUserId]);

    // Lấy video đã like
    useEffect(() => {
        if (activeTab === 'liked' && userId) {
            axios.get(`http://localhost:5000/users/${userId}/liked-videos`)
                .then((res) => setLikedVideos(res.data))
                .catch((err) => console.error('❌ Lỗi khi lấy liked videos:', err));
        }
    }, [activeTab, userId]);

    // Lấy video đã bookmark (favorites)
    useEffect(() => {
        if (activeTab === 'favorites' && userId) {
            axios.get(`http://localhost:5000/users/${userId}/bookmarked-videos`)
                .then((res) => setFavoriteVideos(res.data))
                .catch((err) => console.error('❌ Lỗi khi lấy favorites:', err));
        }
    }, [activeTab, userId]);

    // Tab switcher
    const getVideosByTab = () => {
        if (activeTab === 'videos') {
            return videos.map((video, index) => ({
                id: video._id || index,
                url: video.videoUrl,
                title: video.caption || `Video ${index + 1}`,
            }));
        }
        if (activeTab === 'favorites') {
            return favoriteVideos.map((video, index) => ({
                id: video._id || index,
                url: video.videoUrl,
                title: video.caption || `Favorite ${index + 1}`,
            }));
        }
        if (activeTab === 'liked') {
            return likedVideos.map((video, index) => ({
                id: video._id || index,
                url: video.videoUrl,
                title: video.caption || `Video ${index + 1}`,
            }));
        }
        return [];
    };

    const currentVideos = getVideosByTab();

    return (
        <div className="profile-container">
            {/* Header */}
            <div className="profile-header">
                <img className="avatar" src={user.avatar} alt="avatar" />
                <div className="user-info">
                    <h2 className="username">{user.username}</h2>
                    <p className="handle">@{user.username}</p>

                    <div className="btn-group">
                        <button className="edit-btn">Edit profile</button>
                        <button className="promote-btn">Promote post</button>
                        <button className="icon-btn">⚙</button>
                    </div>

                    <div className="stats">
                        <span><strong className="number">{user.following}</strong> <span className="label">Following</span></span>
                        <span><strong className="number">{user.followers}</strong> <span className="label">Followers</span></span>
                        <span><strong className="number">{user.likes}</strong> <span className="label">Likes</span></span>
                    </div>

                    <p className="bio">{user.bio}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button
                    className={activeTab === 'videos' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('videos')}
                >
                    Videos
                </button>
                <button
                    className={activeTab === 'favorites' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
                <button
                    className={activeTab === 'liked' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('liked')}
                >
                    Liked
                </button>
            </div>

            {/* Video grid */}
            <div className="video-grid grid-layout">
                {currentVideos.length === 0 ? (
                    <p className="no-video">No videos in this section</p>
                ) : (
                    currentVideos.map((video) => (
                        <div
                            key={video.id}
                            className="video-item"
                            onClick={() => navigate(`/video/${video.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <video
                                src={video.url}
                                muted
                                playsInline
                                preload="metadata"
                                controls={false}
                                style={{
                                    width: '100%',
                                    height: '280px',
                                    objectFit: 'cover',
                                    pointerEvents: 'none',
                                    borderRadius: '20px',
                                    backgroundColor: '#000',
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Profile;
