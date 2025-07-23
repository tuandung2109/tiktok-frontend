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
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isSendToOpen, setIsSendToOpen] = useState(false);
    const [bookmarkMessage, setBookmarkMessage] = useState('');
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [isProcessingLike, setIsProcessingLike] = useState(false);
    const [isProcessingBookmark, setIsProcessingBookmark] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    // useEffect để fetch video
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(`http://localhost:5000/videos${userId ? `?userId=${userId}` : ''}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setVideos(data);
                } else {
                    console.error('❌ Dữ liệu trả về không phải mảng:', data);
                    setVideos([]);
                }
            } catch (err) {
                console.error('Lỗi khi fetch video:', err);
                setVideos([]);
            }
        };
        fetchVideos();
    }, [userId]);

    // useEffect để tự động phát video đầu tiên hoặc cuộn đến video mới upload
    useEffect(() => {
        if (videos.length > 0) {
            const uploadedVideoId = location.state?.uploadedVideoId;

            if (uploadedVideoId) {
                // Tìm video vừa tải lên và cuộn đến nó
                const targetVideoElement = document.getElementById(`video-${uploadedVideoId}`);
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
                    // ✅ Xóa state sau khi đã sử dụng để tránh cuộn lại khi reload
                    // Thay thế state hiện tại trong lịch sử trình duyệt mà không thêm một entry mới
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
    }, [videos, location.state?.uploadedVideoId, navigate, location.pathname]); // ✅ Thêm navigate và location.pathname vào dependencies

    // IntersectionObserver useEffect (giữ nguyên)
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
    }, [videos]);

    // ... (các hàm xử lý like, bookmark, follow, comment, v.v. giữ nguyên)
    const handleLikeClick = async (id) => {
        if (isProcessingLike || !userId) return;
        setIsProcessingLike(true);
        const video = videos.find((v) => v._id === id);
        const isCurrentlyLiked = video?.isLiked;

        try {
            const res = await fetch(`http://localhost:5000/videos/${id}/${isCurrentlyLiked ? 'unlike' : 'like'}`, {
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

            await fetch('http://localhost:5000/bookmarks', {
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

            await fetch('http://localhost:5000/follows', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    followerId: userId,
                    followingId: targetUserId,
                }),
            });

            // Cập nhật UI
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
  videos.map((video) => (
    <div key={video._id} id={`video-${video._id}`} className="video-container">
      <video
        className="video-player"
        src={video.videoUrl}
        controls
        loop
        muted
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
                ))}

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