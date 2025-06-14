import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CommentModal.scss';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

Modal.setAppElement('#root');

function CommentModal({ isOpen, onClose }) {
    const [visibleCount, setVisibleCount] = useState(5);
    const [likedStates, setLikedStates] = useState({});

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const comments = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        user: `user${index}`,
        text: `Bình luận số ${index + 1}`,
    }));

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    const toggleLike = (id) => {
        setLikedStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Comment Modal"
            className="tiktok-modal-content"
            overlayClassName="tiktok-modal-overlay"
        >
            <div className="comment-header">
                <span>Bình luận ({comments.length})</span>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </div>

            <div className="comment-body">
                {comments.slice(0, visibleCount).map((comment) => (
                    <div className="comment-item" key={comment.id}>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="avatar"
                            className="avatar"
                        />
                        <div className="comment-info">
                            <p className="username">{comment.user}</p>
                            <p className="text">{comment.text}</p>
                            <div className="comment-meta">
                                <span>1 giờ trước</span>
                                <span>Trả lời</span>
                            </div>
                        </div>
                        <div
                            className="like-icon"
                            onClick={() => toggleLike(comment.id)}
                        >
                        <i
                            className={likedStates[comment.id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                            style={{
                                color: likedStates[comment.id] ? '#ff2e63' : '#74C0FC',
                            }}
                        ></i>
                        </div>
                    </div>
                ))}

                {visibleCount < comments.length && (
                    <div className="view-replies" onClick={handleLoadMore}>
                        Xem thêm
                    </div>
                )}
            </div>

            <div className="comment-footer">
                <input type="text" placeholder="Thêm bình luận..." />
                <button>Đăng</button>
            </div>
        </Modal>
    );
}

export default CommentModal;
