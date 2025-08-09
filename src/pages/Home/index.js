import React, { useState, useRef, useEffect } from 'react';
import CommentModal from '~/components/CommentModal/CommentModal';
import SendToModal from '~/components/SendToModal/SendToModal';
import './Home.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';

function Home() {
    // State để lưu danh sách video đã fetch ban đầu và đã được shuffle một lần
    const [shuffledVideos, setShuffledVideos] = useState([]);
    // State để lưu danh sách video hiện tại đang hiển thị (có thể vô hạn)
    const [displayedVideos, setDisplayedVideos] = useState([]);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isSendToOpen, setIsSendToOpen] = useState(false);
    const [bookmarkMessage, setBookmarkMessage] = useState('');
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [isProcessingLike, setIsProcessingLike] = useState(false);
    const [isProcessingBookmark, setIsProcessingBookmark] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Thêm state loading
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    // Hàm shuffle mảng (thuật toán Fisher-Yates)
    const shuffleArray = (array) => {
        let newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // useEffect để fetch video, shuffle một lần và lưu vào state
    useEffect(() => {
        const fetchVideos = async () => {
            setIsLoading(true); // Bắt đầu loading
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE}/videos${userId ? `?userId=${userId}` : ''}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const initialShuffledList = shuffleArray(data);
                    setShuffledVideos(initialShuffledList);
                } else {
                    console.error('❌ Dữ liệu trả về không phải mảng hoặc rỗng:', data);
                    setShuffledVideos([]);
                }
            } catch (err) {
                console.error('Lỗi khi fetch video:', err);
                setShuffledVideos([]);
            } finally {
                setIsLoading(false); // Kết thúc loading
            }
        };
        fetchVideos();
    }, [userId]);

    // useEffect để khởi tạo danh sách video hiển thị và xử lý cuộn vô hạn
    useEffect(() => {
        if (shuffledVideos.length > 0) {
            setDisplayedVideos(shuffledVideos);
        }
    }, [shuffledVideos]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || shuffledVideos.length === 0) return;

        const handleScroll = () => {
            // Check if scrolled to the last video's area
            if (container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
                setDisplayedVideos((prev) => [...prev, ...shuffledVideos]);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [shuffledVideos]);


    // useEffect để tự động phát video đầu tiên hoặc cuộn đến video mới upload
    useEffect(() => {
        if (displayedVideos.length > 0) {
            const uploadedVideoId = location.state?.uploadedVideoId;

            if (uploadedVideoId) {
                // Tìm video vừa tải lên và cuộn đến nó
                const targetVideoElement = document.getElementById(`video-${uploadedVideoId}-0`); // Key đầu tiên là 0
                if (targetVideoElement) {
                    targetVideoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const videoPlayer = targetVideoElement.querySelector('.video-player');
                    if (videoPlayer) {
                        videoPlayer.muted = false;
                        const playPromise = videoPlayer.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                                console.log('Autoplay video vừa upload bị chặn:', error);
                            });
                        }
                    }
                    navigate(location.pathname, { replace: true, state: {} });
                } else {
                    // Nếu không tìm thấy video vừa upload, cuộn đến video đầu tiên
                    const firstVideo = document.querySelector('.video-player');
                    if (firstVideo) {
                        firstVideo.muted = false;
                        const playPromise = firstVideo.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                                console.log('Autoplay video đầu bị chặn:', error);
                            });
                        }
                    }
                }
            } else {
                // Nếu không có video mới upload, chỉ tự động phát video đầu tiên
                const firstVideo = document.querySelector('.video-player');
                if (firstVideo) {
                    firstVideo.muted = false;
                    const playPromise = firstVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((error) => {
                            console.log('Autoplay video đầu bị chặn:', error);
                        });
                    }
                }
            }
        }
    }, [displayedVideos, location.state?.uploadedVideoId, navigate, location.pathname]);


    // IntersectionObserver useEffect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.muted = false;
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                                // console.log('Autoplay with sound bị chặn:', error);
                            });
                        }
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.75 }
        );

        const videoElements = document.querySelectorAll('.video-player');
        videoElements.forEach((video) => observer.observe(video));
        return () => {
            videoElements.forEach((video) => observer.unobserve(video));
        };
    }, [displayedVideos]); // Thay đổi dependency thành displayedVideos

    // ------------------- HÀM XỬ LÝ SỰ KIỆN -------------------

    // Các hàm xử lý Like, Bookmark, Comment, Follow cần được cập nhật
    // để thay đổi state displayedVideos thay vì videos cũ
    
    const handleLikeClick = async (videoId) => {
        if (isProcessingLike || !userId) return;
        setIsProcessingLike(true);
    
        const videoIndex = displayedVideos.findIndex((v) => v._id === videoId);
        if (videoIndex === -1) {
            setIsProcessingLike(false);
            return;
        }
        const video = displayedVideos[videoIndex];
        const isCurrentlyLiked = video?.isLiked;
    
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/videos/${videoId}/${isCurrentlyLiked ? 'unlike' : 'like'}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
    
            const updatedVideo = await res.json();
    
            setDisplayedVideos((prev) => {
                const newVideos = [...prev];
                newVideos.forEach((v, index) => {
                    if (v._id === videoId) {
                        newVideos[index] = {
                            ...v,
                            likesCount: updatedVideo.likesCount,
                            isLiked: !isCurrentlyLiked,
                        };
                    }
                });
                return newVideos;
            });
        } catch (err) {
            console.error('Lỗi khi toggle like video:', err);
        } finally {
            setIsProcessingLike(false);
        }
    };

    const handleBookmarkClick = async (videoId) => {
        if (isProcessingBookmark || !userId) return;
        setIsProcessingBookmark(true);
    
        const videoIndex = displayedVideos.findIndex((v) => v._id === videoId);
        if (videoIndex === -1) {
            setIsProcessingBookmark(false);
            return;
        }
        const video = displayedVideos[videoIndex];
        const isBookmarked = video?.isBookmarked;
    
        try {
            const method = isBookmarked ? 'DELETE' : 'POST';
    
            await fetch(`${process.env.REACT_APP_API_BASE}/bookmarks`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, videoId }),
            });
    
            setDisplayedVideos((prev) => {
                const newVideos = [...prev];
                newVideos.forEach((v, index) => {
                    if (v._id === videoId) {
                        newVideos[index] = { ...v, isBookmarked: !isBookmarked };
                    }
                });
                return newVideos;
            });
    
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
    
        const video = displayedVideos.find((v) => v.userId?._id === targetUserId);
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
    
            setDisplayedVideos((prev) =>
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
            {isLoading && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#ff2e63" />
                    <div style={{ marginTop: 10, fontWeight: 500 }}>Đang tải video...</div>
                </div>
            )}
            {!isLoading && Array.isArray(displayedVideos) &&
                displayedVideos.map((video, index) => (
                    <div key={`${video._id}-${index}`} id={`video-${video._id}-${index}`} className="video-container">
                        
                        <video
                            className="video-player"
                            src={video.videoUrl}
                            muted
                            autoPlay
                            playsInline
                            webkit-playsinline="true"
                            loop
                            preload="auto"
                            controls
                            ref={(el) => {
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
                                        videos: displayedVideos,
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
                ))}

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={handleCloseModal}
                videoId={currentVideoId}
                onCommentAdded={() => {
                    setDisplayedVideos((prev) =>
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