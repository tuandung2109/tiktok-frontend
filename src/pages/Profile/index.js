import React, { useEffect, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

    const { userId: paramUserId } = useParams();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUserId = storedUser?._id;

    const isCurrentUserProfile = !paramUserId || paramUserId === storedUserId;
    const userId = paramUserId || storedUserId;
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (!isCurrentUserProfile && storedUserId && userId) {
            axios.post('http://localhost:5000/follows/check', {
                followerId: storedUserId,
                followingId: userId,
            })
            .then((res) => {
                setIsFollowing(res.data.isFollowing);
            })
            .catch((err) => console.error('❌ Lỗi khi kiểm tra trạng thái follow:', err));
        }
    }, [userId, storedUserId, isCurrentUserProfile]);

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
                }));
            })
            .catch((err) => console.error('❌ Lỗi khi lấy thông tin user:', err));
    }, [userId]);

    useEffect(() => {
        if (!userId) return;
        axios.get(`http://localhost:5000/videos?userId=${storedUserId}&filterByUser=${userId}`)
            .then((res) => setVideos(res.data))
            .catch((err) => console.error('❌ Lỗi khi lấy video:', err));
    }, [userId, storedUserId]);

    useEffect(() => {
        if (activeTab === 'liked' && userId) {
            axios.get(`http://localhost:5000/users/${userId}/liked-videos`)
                .then((res) => setLikedVideos(res.data))
                .catch((err) => console.error('❌ Lỗi khi lấy liked videos:', err));
        }
    }, [activeTab, userId]);

    useEffect(() => {
        if (activeTab === 'favorites' && userId) {
            axios.get(`http://localhost:5000/users/${userId}/bookmarked-videos`)
                .then((res) => setFavoriteVideos(res.data))
                .catch((err) => console.error('❌ Lỗi khi lấy favorites:', err));
        }
    }, [activeTab, userId]);

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:5000/users/${userId}/stats`)
            .then((res) => {
                setUser((prev) => ({
                    ...prev,
                    followers: res.data.followers,
                    following: res.data.following,
                    likes: res.data.likes,
                }));
            })
            .catch((err) => console.error('❌ Lỗi khi lấy stats:', err));
    }, [userId]);

    const handleFollowToggle = () => {
        if (!storedUserId || !userId) return;

        if (isFollowing) {
            axios.delete('http://localhost:5000/follows', {
                data: { followerId: storedUserId, followingId: userId },
            })
            .then(() => setIsFollowing(false))
            .catch((err) => console.error('❌ Lỗi khi unfollow:', err));
        } else {
            axios.post('http://localhost:5000/follows', {
                followerId: storedUserId,
                followingId: userId,
            })
            .then(() => setIsFollowing(true))
            .catch((err) => console.error('❌ Lỗi khi follow:', err));
        }
    };

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
            <div className="profile-header">
                <img className="avatars" src={user.avatar} alt="avatar" />
                <div className="user-info">
                    <h2 className="username">{user.username}</h2>
                    <p className="handle">@{user.username}</p>

                    <div className="btn-group">
                        {isCurrentUserProfile ? (
                            <>
                                <button className="edit-btn">Edit profile</button>
                                <button className="promote-btn">Promote post</button>
                            </>
                        ) : (
                            <>
                                <button
                                    className={isFollowing ? 'following-btn' : 'follow-btn'}
                                    onClick={handleFollowToggle}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                                <Link
                                    to={`/messages/${user.username}`}
                                    state={{
                                        partnerId: userId,
                                        name: user.username,
                                        avatar: user.avatar
                                    }}
                                    className="message-btn"
                                    >
                                    Message
                                </Link>
                            </>
                        )}
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

            <div className="video-grid grid-layout">
                {currentVideos.length === 0 ? (
                    <p className="no-video">No videos in this section</p>
                ) : (
                    currentVideos.map((video) => (
                        <div
                            key={video.id}
                            className="video-item"
                            onClick={() => navigate(`/video-detail/${video.id}`, {
                                state: {
                                    video,
                                    videos: currentVideos,
                                    fromProfile: true,
                                },
                            })}
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