import React, { useState } from 'react';
import './Profile.scss';


function Profile() {
    const [activeTab, setActiveTab] = useState('videos');
    const user = {
        avatar: '/images/avatar.png',
        username: 'hhuhuu21',
        bio: 'No bio yet.',
        following: 0,
        followers: 0,
        likes: 0,
    };

    return (
        <div className="profile-container">
            {/* Avatar + username */}
            <div className="profile-header">
                <img className="avatar" src={user.avatar} alt="avatar" />
                <div className="user-info">
                    <h2 className="username">{user.username}</h2>
                    <p className="handle">{user.username}</p>

                    <div className="btn-group">
                        <button className="edit-btn">Edit profile</button>
                        <button className="promote-btn">Promote post</button>
                        <button className="icon-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                style={{ width: 20, height: 20, verticalAlign: 'middle' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
 
                        </button>
                        <button className="icon-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                                style={{ width: 20, height: 20, verticalAlign: 'middle' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                />
                            </svg>                                
                        </button>
                    </div>
                    
                <div className="stats">
                    <span>
                        <strong className="number">{user.following}</strong>{' '}
                        <span className="label">Following</span>
                    </span>
                    <span>
                        <strong className="number">{user.followers}</strong>{' '}
                        <span className="label">Followers</span>
                    </span>
                    <span>
                        <strong className="number">{user.likes}</strong>{' '}
                        <span className="label">Likes</span>
                    </span>
                </div>
                    <p className="bio">{user.bio}</p>
                </div>
            </div>

            {/* icon của video và liked trong https://heroicons.com , còn favorites thì dùng icon bookmark của font awesome */}

            {/* Tabs: Videos / Favorites / Liked */}
            <div className="profile-tabs">
                <button className={activeTab === 'videos' ? 'active-tab' : ''} onClick={() => setActiveTab('videos')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 6 }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                    </svg>
                    Videos
                </button>
                <button
                    className={activeTab === 'favorites' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('favorites')}
                >
                    <i className="fa-regular fa-bookmark" style={{ color: '#000000', marginRight: 6 }}></i>
                    Favorites
                </button>
                <button className={activeTab === 'liked' ? 'active-tab' : ''} onClick={() => setActiveTab('liked')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 6 }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                    Liked
                </button>
            </div>

            {/* Empty message */}
            <div className="video-grid">
                <p className="no-video">Upload your first video</p>
            </div>
        </div>
    );
}

export default Profile;
