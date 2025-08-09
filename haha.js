
import React, { useState, useRef, useEffect } from 'react';
import CommentModal from '~/components/CommentModal/CommentModal';
import SendToModal from '~/components/SendToModal/SendToModal';
import './Home.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [videos, setVideos] = useState([]);
    const [shuffledVideos, setShuffledVideos] = useState([]);
    
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isSendToOpen, setIsSendToOpen] = useState(false);
    const [bookmarkMessage, setBookmarkMessage] = useState('');
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [isProcessingLike, setIsProcessingLike] = useState(false);
    const [isProcessingBookmark, setIsProcessingBookmark] = useState(false);
    
    const containerRef = useRef(null);
    const lastVideoRef = useRef(null);
    const videoRefs = useRef([]); 

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    // --- LOGIC FETCH, SHUFFLE VÀ QUẢN LÝ VIDEO REFS ---
    useEffect(() => {
        const fetchAndShuffleVideos = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE}/videos${userId ? `?userId=${userId}` : ''}`);
                const data = await res.json();
                
                if (Array.isArray(data) && data.length > 0) {
                    const shuffled = [...data].sort(() => 0.5 - Math.random());
                    setShuffledVideos(shuffled);
                    setVideos(shuffled);
                } else {
                    console.error('❌ Dữ liệu trả về không phải mảng hoặc rỗng:', data);
                    setVideos([]);
                }
            } catch (err) {
                console.error('Lỗi khi fetch video:', err);
                setVideos([]);
            }
        };
        fetchAndShuffleVideos();
        
        return () => {
            videoRefs.current = [];
        };
    }, [userId]);

    // --- LOGIC TỰ ĐỘNG PHÁT/DỪNG VIDEO KHI CUỘN ---
    useEffect(() => {
        if (videos.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
                        video.play();
                        video.muted = false;
                    } else {
                        video.pause();
                        video.muted = true;
                    }
                });
            },
            {
                threshold: 0.75,
            }
        );

        videoRefs.current.forEach((videoRef) => {
            if (videoRef) {
                observer.observe(videoRef);
            }
        });

        return () => {
            videoRefs.current.forEach((videoRef) => {
                if (videoRef) {
                    observer.unobserve(videoRef);
                }
            });
        };
    }, [videos]);

    // --- LOGIC NỐI THÊM VIDEO KHI CUỘN ĐẾN CUỐI ---
    useEffect(() => {
        if (videos.length === 0 || !lastVideoRef.current || shuffledVideos.length === 0) return;

        const lastVideoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && shuffledVideos.length > 0) {
                        console.log('Đã đến cuối danh sách, nối thêm video...');
                        setVideos((prevVideos) => [...prevVideos, ...shuffledVideos]);
                    }
                });
            },
            { threshold: 0.5 }
        );

        lastVideoObserver.observe(lastVideoRef.current);

        return () => {
            if (lastVideoRef.current) {
                lastVideoObserver.unobserve(lastVideoRef.current);
            }
        };
    }, [videos, shuffledVideos]);
    
    // --- Đã xoá bỏ useEffect gây ra lỗi tự động cuộn ---
    // Trước đó, đoạn code này có thể gây ra hiện tượng tự động cuộn
    // sau khi video đầu tiên được render, ngay cả khi không có
    // uploadedVideoId. Việc xoá nó sẽ khắc phục vấn đề.

    const handleLikeClick = async (id) => {
        if (isProcessingLike || !userId) return;
        setIsProcessingLike(true);
        const video = videos.find((v) => v._id === id);
        const isCurrentlyLiked = video?.isLiked;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/videos/${id}/${isCurrentlyLiked ? 'unlike' : 'like'}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            const updatedVideo = await res.json();

            setVideos((prev) =>
                prev.map((v) =>
                    v._id === id
                        ? {
                            ...v,
                            likesCount: updatedVideo.likesCount,
                            isLiked: !isCurrentlyLiked,
                        }
                        : v
                )
            );
        } catch (err) {
            console.error('Lỗi khi toggle like video:', err);
        } finally {
            setIsProcessingLike(false);
        }
    };

    const handleBookmarkClick = async (videoId) => {
        if (isProcessingBookmark || !userId) return;
        setIsProcessingBookmark(true);

        const video = videos.find((v) => v._id === videoId);
        const isBookmarked = video?.isBookmarked;

        try {
            console.log('📦 Bookmark Payload:', { userId, videoId });

            const method = isBookmarked ? 'DELETE' : 'POST';

            await fetch(`${process.env.REACT_APP_API_BASE}/bookmarks`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, videoId }),
            });

            setVideos((prev) =>
                prev.map((v) =>
                    v._id === videoId ? { ...v, isBookmarked: !isBookmarked } : v
                )
            );

            setBookmarkMessage(
                isBookmarked ? 'Bạn đã bỏ lưu video này!' : 'Bạn đã lưu video này!'
            );
            setTimeout(() => setBookmarkMessage(''), 3000);
        } catch (err) {
            console.error('❌ Lỗi khi toggle bookmark:', err);
        } finally {
            setIsProcessingBookmark(false);
        }
    };

    const handleFollowClick = async (targetUserId) => {
        if (!userId || targetUserId === userId) return;

        const video = videos.find((v) => v.userId?._id === targetUserId);
        const isFollowed = video?.isFollowed;

        try {
            const method = isFollowed ? 'DELETE' : 'POST';

            await fetch(`${process.env.REACT_APP_API_BASE}/follows`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    followerId: userId,
                    followingId: targetUserId,
                }),
            });

            setVideos((prev) =>
                prev.map((v) =>
                    v.userId?._id === targetUserId
                        ? { ...v, isFollowed: !isFollowed }
                        : v
                )
            );
        } catch (err) {
            console.error('❌ Lỗi khi toggle follow:', err);
        }
    };

    const handleCommentClick = (videoId) => {
        setCurrentVideoId(videoId);
        setIsCommentModalOpen(true);
    };

    const handleCloseModal = () => setIsCommentModalOpen(false);

    return (
        <div className="home-wrapper" ref={containerRef}>
            {Array.isArray(videos) &&
                videos.map((video, index) => {
                    const isLastVideo = index === videos.length - 1;

                    return (
                        <div
                            key={`${video._id}-${index}`}
                            id={`video-${video._id}-${index}`}
                            className="video-container"
                            ref={isLastVideo ? lastVideoRef : null}
                        >
                            <div className="video-player-wrapper">
                                <video
                                    className="video-player"
                                    src={video.videoUrl}
                                    playsInline
                                    webkit-playsinline
                                    loop
                                    preload="auto"
                                    controls
                                    ref={(el) => {
                                        videoRefs.current[index] = el;
                                        if (el) {
                                            el.onloadedmetadata = () => {
                                                el.classList.remove('fit-cover', 'fit-contain');
                                                const isPortrait = el.videoHeight > el.videoWidth;
                                                el.classList.add(isPortrait ? 'fit-cover' : 'fit-contain');
                                            };
                                        }
                                    }}
                                ></video>

                                <div
                                    className="video-info-icon"
                                    onClick={() =>
                                        navigate(`/video-detail/${video._id}`, {
                                            state: {
                                                video,
                                                videos,
                                            },
                                        })
                                    }
                                >
                                    <FontAwesomeIcon icon={faEye} style={{ color: '#000000' }} />
                                </div>

                                <div className="action-sidebar">
                                    <div className="action-item">
                                        <img
                                            src={video.userId?.avatarUrl || '/images/avatar.png'}
                                            alt="avatar"
                                            className="avatar"
                                            onClick={() => navigate(`/profile/${video.userId?._id}`)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <div
                                            className={`plus-icon ${video.isFollowed ? 'followed' : ''}`}
                                            onClick={() => handleFollowClick(video.userId?._id)}
                                        >
                                            {video.isFollowed ? (
                                                <i className="fa-solid fa-check" style={{ color: '#e70d39' }}></i>
                                            ) : (
                                                <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
                                            )}
                                        </div>
                                    </div>
                                    <div className="action-item">
                                        <div className="icon-wrapper" onClick={() => handleLikeClick(video._id)}>
                                            <i className={`fa-solid fa-heart icon ${video.isLiked ? 'liked' : ''}`}></i>
                                        </div>
                                        <span>{video.likesCount}</span>
                                    </div>
                                    <div className="action-item">
                                        <div className="icon-wrapper" onClick={() => handleCommentClick(video._id)}>
                                            <i className="fa-solid fa-comment icon"></i>
                                        </div>
                                        <span>{video.commentsCount}</span>
                                    </div>
                                    <div className="action-item">
                                        <div className="icon-wrapper" onClick={() => handleBookmarkClick(video._id)}>
                                            <i className={`fa-solid fa-bookmark icon ${video.isBookmarked ? 'bookmarked' : ''}`}></i>
                                        </div>
                                        <span>Save</span>
                                    </div>
                                    <div className="action-item">
                                        <div className="icon-wrapper" onClick={() => setIsSendToOpen(true)}>
                                            <i className="fa-solid fa-share icon"></i>
                                        </div>
                                        <span>Share</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={handleCloseModal}
                videoId={currentVideoId}
                onCommentAdded={() => {
                    setVideos((prev) =>
                        prev.map((v) =>
                            v._id === currentVideoId ? { ...v, commentsCount: v.commentsCount + 1 } : v
                        )
                    );
                }}
            />

            <SendToModal isOpen={isSendToOpen} onClose={() => setIsSendToOpen(false)} />

            <div className="scroll-buttons">
                <button onClick={() => containerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}>
                    <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button onClick={() => containerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
            </div>

            {bookmarkMessage && <div className="bookmark-message">{bookmarkMessage}</div>}
        </div>
    );
}

export default Home;