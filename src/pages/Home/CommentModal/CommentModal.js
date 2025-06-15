import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CommentModal.scss';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome để sử dụng icon

Modal.setAppElement('#root'); // Cài đặt phần tử gốc cho Modal để tránh lỗi accessibility

function CommentModal({ isOpen, onClose }) {
    const [visibleCount, setVisibleCount] = useState(5); // Số lượng comment hiển thị ban đầu
    const [likedStates, setLikedStates] = useState({});  // Trạng thái like cho từng comment

    // Vô hiệu hóa cuộn trang khi modal mở
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

    // Danh sách comment mẫu
    const comments = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        user: `Người dùng ${index + 1}`, // Tên người dùng rõ ràng hơn
        text: `Đây là bình luận số ${index + 1}`, // Nội dung bình luận
    }));

    // Tăng số comment hiển thị thêm 5
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    // Bật/tắt trạng thái like cho từng comment
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
            {/* Phần tiêu đề modal */}
            <div className="comment-header">
                <span>Bình luận ({comments.length})</span>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </div>

            {/* Danh sách bình luận */}
            <div className="comment-body">
                {comments.slice(0, visibleCount).map((comment) => (
                    <div className="comment-item" key={comment.id}>
                        {/* Avatar người dùng */}
                        <img
                            src="./images/avatar.png"
                            alt="avatar"
                            className="avatar"
                        />

                        {/* Thông tin bình luận */}
                        <div className="comment-info">
                            <p className="username">{comment.user}</p>
                            <p className="text">{comment.text}</p>
                            <div className="comment-meta">
                                <span>1 giờ trước</span>
                                <span>Trả lời</span>
                            </div>
                        </div>

                        {/* Icon like có thể toggle màu */}
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

                {/* Nút xem thêm */}
                {visibleCount < comments.length && (
                    <div className="view-replies" onClick={handleLoadMore}>
                        Xem thêm
                    </div>
                )}
            </div>

            {/* Phần nhập bình luận mới */}
            <div className="comment-footer">
                <input type="text" placeholder="Thêm bình luận..." />
                <button>Đăng</button>
            </div>
        </Modal>
    );
}

export default CommentModal;
