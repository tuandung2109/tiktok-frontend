import React, { useState } from 'react';
// import CommentModal from '../../components/CommentModal';
import CommentModal from '../../components/CommentModal/CommentModal';
import './Home.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
    // State để quản lý trạng thái "đã thích" và "đã bookmark"
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State để quản lý modal

    // Hàm xử lý khi bấm vào icon trái tim
    const handleLikeClick = () => {
        setIsLiked(!isLiked); // Đảo ngược trạng thái
    };

    // Hàm xử lý khi bấm vào icon bookmark
    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked); // Đảo ngược trạng thái
    };

    // Hàm xử lý khi bấm vào icon bình luận
    const handleCommentClick = () => {
        setIsCommentModalOpen(true); // Mở modal
    };

    // Hàm xử lý đóng modal
    const handleCloseModal = () => {
        setIsCommentModalOpen(false); // Đóng modal
    };

    return (
        <div className="home-wrapper">
            <div className="video-container">
                <video
                    className="video-player"
                    src="/videos/video1.mp4"
                    controls
                    autoPlay
                    loop
                ></video>
            </div>

            <div className="action-sidebar">
                {/* Avatar */}
                <div className="action-item">
                    <img src="/images/avatar.png" alt="avatar" className="avatar" />
                    <div className="plus-icon">+</div>
                </div>

                {/* Like */}
                <div className="action-item">
                    <div className="icon-wrapper" onClick={handleLikeClick}>
                        <i className={`fa-solid fa-heart icon ${isLiked ? 'liked' : ''}`}></i>
                    </div>
                    <span>40.4K</span>
                </div>

                {/* Comment */}
                <div className="action-item">
                    <div className="icon-wrapper" onClick={handleCommentClick}>
                        <i className="fa-solid fa-comment icon"></i>
                    </div>
                    <span>380</span>
                </div>

                {/* Bookmark */}
                <div className="action-item">
                    <div className="icon-wrapper" onClick={handleBookmarkClick}>
                        <i className={`fa-solid fa-bookmark icon ${isBookmarked ? 'bookmarked' : ''}`}></i>
                    </div>
                    <span>4620</span>
                </div>

                {/* Share */}
                <div className="action-item">
                    <div className="icon-wrapper">
                        <i className="fa-solid fa-share icon"></i>
                    </div>
                    <span>1418</span>
                </div>
            </div>

            {/* Sử dụng CommentModal */}
            <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Home;
