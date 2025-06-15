import React, { useState } from 'react';
import CommentModal from './CommentModal/CommentModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);

        if (!isBookmarked) {
            toast.success('Bạn đã lưu video này!', {
                position: "bottom-right", // Đặt vị trí ở góc cuối bên phải
                autoClose: 3000,
            });
        } else {
            toast.info('Bạn đã bỏ lưu video này!', {
                position: "bottom-right", // Đặt vị trí ở góc cuối bên phải
                autoClose: 3000,
            });
        }
    };

    const handleCommentClick = () => {
        setIsCommentModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCommentModalOpen(false);
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
                <div className="action-item">
                    <img src="/images/avatar.png" alt="avatar" className="avatar" />
                    <div className="plus-icon">+</div>
                </div>

                <div className="action-item">
                    <div className="icon-wrapper" onClick={handleLikeClick}>
                        <i className={`fa-solid fa-heart icon ${isLiked ? 'liked' : ''}`}></i>
                    </div>
                    <span>40.4K</span>
                </div>

                <div className="action-item">
                    <div className="icon-wrapper" onClick={handleCommentClick}>
                        <i className="fa-solid fa-comment icon"></i>
                    </div>
                    <span>380</span>
                </div>

                <div className="action-item">
                    <div className="icon-wrapper" onClick={handleBookmarkClick}>
                        <i className={`fa-solid fa-bookmark icon ${isBookmarked ? 'bookmarked' : ''}`}></i>
                    </div>
                    <span>4620</span>
                </div>

                <div className="action-item">
                    <div className="icon-wrapper">
                        <i className="fa-solid fa-share icon"></i>
                    </div>
                    <span>1418</span>
                </div>
            </div>

            <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseModal} />

            {/* React-Toastify container */}
            <ToastContainer />
        </div>
    );
}

export default Home;
