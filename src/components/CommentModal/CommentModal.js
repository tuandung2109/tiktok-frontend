import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';
import './CommentModal.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

Modal.setAppElement('#root');

function CommentModal({ isOpen, onClose }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [likedStates, setLikedStates] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const commentBodyRef = useRef(null);
  const emojiPickerRef = useRef(null);

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

  // Xử lý click ra ngoài để đóng Emoji Picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !event.target.closest('.emoji-button')
      ) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const avatarUrls = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/65.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
  ];

  const [comments, setComments] = useState(() =>
    Array.from({ length: 20 }, (_, index) => ({
      id: index,
      user: `Người dùng ${index + 1}`,
      avatar: avatarUrls[index % avatarUrls.length],
      text: `Đây là bình luận số ${index + 1}`,
    }))
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const toggleLike = (id) => {
    setLikedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onEmojiClick = (emojiData) => {
    setCommentInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handlePostComment = () => {
    if (commentInput.trim() === '') return;

    const newComment = {
      id: Date.now(),
      user: 'Bạn',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      text: commentInput,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentInput('');
    setVisibleCount((prev) => prev + 1);

    setTimeout(() => {
      if (commentBodyRef.current) {
        commentBodyRef.current.scrollTop = 0;
      }
    }, 0);
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

      <div className="comment-body" ref={commentBodyRef}>
        {comments.slice(0, visibleCount).map((comment) => (
          <div className="comment-item" key={comment.id}>
            <img
              src={comment.avatar}
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
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Thêm bình luận..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <i className="fa-regular fa-face-smile"></i>
          </button>
        </div>
        <button onClick={handlePostComment}>Đăng</button>
      </div>

      {showEmojiPicker && (
        <div className="emoji-picker-container" ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </Modal>
  );
}

export default CommentModal;
