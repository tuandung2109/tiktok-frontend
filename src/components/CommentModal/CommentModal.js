// import React, { useState, useEffect, useRef } from 'react';
// import Modal from 'react-modal';
// import EmojiPicker from 'emoji-picker-react';
// import './CommentModal.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Modal.setAppElement('#root');

// function CommentModal({ isOpen, onClose, videoId }) {
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [likedStates, setLikedStates] = useState({});
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [commentInput, setCommentInput] = useState('');
//   const [comments, setComments] = useState([]);

//   const commentBodyRef = useRef(null);
//   const emojiPickerRef = useRef(null);

//   useEffect(() => {
//     if (isOpen && videoId) {
//       fetch(`http://localhost:5000/comments/${videoId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setComments(data);
//           setVisibleCount(5);
//         })
//         .catch((err) => console.error('Lỗi khi fetch comment:', err));
//     }
//   }, [isOpen, videoId]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target) &&
//         !event.target.closest('.emoji-button')
//       ) {
//         setShowEmojiPicker(false);
//       }
//     }

//     if (showEmojiPicker) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showEmojiPicker]);

//   const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

//   const toggleLike = (id) => {
//     setLikedStates((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const onEmojiClick = (emojiData) => {
//     setCommentInput((prev) => prev + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Comment Modal"
//       className="tiktok-modal-content"
//       overlayClassName="tiktok-modal-overlay"
//     >
//       <div className="comment-header">
//         <span>Bình luận ({comments.length})</span>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//       </div>

//       <div className="comment-body" ref={commentBodyRef}>
//         {comments.slice(0, visibleCount).map((comment) => (
//           <div className="comment-item" key={comment._id}>
//             <img
//               src={comment.userId?.avatarUrl || '/images/avatar.png'}
//               alt="avatar"
//               className="avatar"
//             />
//             <div className="comment-info">
//               <p className="username">{comment.userId?.username || 'Ẩn danh'}</p>
//               <p className="text">{comment.content}</p>
//               <div className="comment-meta">
//                 <span>{new Date(comment.createdAt).toLocaleString()}</span>
//                 <span>Trả lời</span>
//               </div>
//             </div>
//             <div className="like-icon" onClick={() => toggleLike(comment._id)}>
//               <i
//                 className={likedStates[comment._id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
//                 style={{
//                   color: likedStates[comment._id] ? '#ff2e63' : '#74C0FC',
//                 }}
//               ></i>
//             </div>
//           </div>
//         ))}
//         {visibleCount < comments.length && (
//           <div className="view-replies" onClick={handleLoadMore}>
//             Xem thêm
//           </div>
//         )}
//       </div>

//       <div className="comment-footer">
//         <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="Thêm bình luận..."
//             value={commentInput}
//             onChange={(e) => setCommentInput(e.target.value)}
//           />
//           <button className="emoji-button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
//             <i className="fa-regular fa-face-smile"></i>
//           </button>
//         </div>
//         <button>Đăng</button>
//       </div>

//       {showEmojiPicker && (
//         <div className="emoji-picker-container" ref={emojiPickerRef}>
//           <EmojiPicker onEmojiClick={onEmojiClick} />
//         </div>
//       )}
//     </Modal>
//   );
// }

// export default CommentModal;


// import React, { useState, useEffect, useRef } from 'react';
// import Modal from 'react-modal';
// import EmojiPicker from 'emoji-picker-react';
// import './CommentModal.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Modal.setAppElement('#root');

// function CommentModal({ isOpen, onClose, videoId, onCommentAdded }) {
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [likedStates, setLikedStates] = useState({});
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [commentInput, setCommentInput] = useState('');
//   const [comments, setComments] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const commentBodyRef = useRef(null);
//   const emojiPickerRef = useRef(null);

//   // 👇 Giả định bạn đang có userId từ localStorage hoặc context (tạm hardcode)
//   const currentUserId = 'PUT-YOUR-USER-ID-HERE'; // ❗ Thay bằng user thật sự

//   // Fetch comment khi mở modal
//   useEffect(() => {
//     if (isOpen && videoId) {
//       fetch(`http://localhost:5000/comments/${videoId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setComments(data);
//           setVisibleCount(5);
//         })
//         .catch((err) => console.error('Lỗi khi fetch comment:', err));
//     }
//   }, [isOpen, videoId]);

//   // Đóng emoji khi click ngoài
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target) &&
//         !event.target.closest('.emoji-button')
//       ) {
//         setShowEmojiPicker(false);
//       }
//     }

//     if (showEmojiPicker) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showEmojiPicker]);

//   const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

//   const toggleLike = (id) => {
//     setLikedStates((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const onEmojiClick = (emojiData) => {
//     setCommentInput((prev) => prev + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

// const handleSubmitComment = async () => {
//   if (!commentInput.trim()) return;

//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const currentUserId = storedUser?._id;

//   if (!currentUserId) {
//     alert('Bạn cần đăng nhập để bình luận!');
//     return;
//   }

//   try {
//     setIsSubmitting(true);
//     const res = await fetch('http://localhost:5000/comments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         videoId,
//         userId: currentUserId,
//         content: commentInput,
//       }),
//     });

//     const newComment = await res.json();

//     // ✅ Cập nhật comment mới vào UI
//     setComments((prev) => [newComment, ...prev]);
//     setCommentInput('');

//     // ✅ Gọi callback để Home tăng commentsCount
//     if (onCommentAdded) onCommentAdded();
//   } catch (err) {
//     console.error('Lỗi khi gửi bình luận:', err);
//   } finally {
//     setIsSubmitting(false);
//   }
// };


//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Comment Modal"
//       className="tiktok-modal-content"
//       overlayClassName="tiktok-modal-overlay"
//     >
//       <div className="comment-header">
//         <span>Bình luận ({comments.length})</span>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//       </div>

//       <div className="comment-body" ref={commentBodyRef}>
//         {comments.slice(0, visibleCount).map((comment) => (
//           <div className="comment-item" key={comment._id}>
//             <img
//               src={comment.userId?.avatarUrl || '/images/avatar.png'}
//               alt="avatar"
//               className="avatar"
//             />
//             <div className="comment-info">
//               <p className="username">{comment.userId?.username || 'Ẩn danh'}</p>
//               <p className="text">{comment.content}</p>
//               <div className="comment-meta">
//                 <span>{new Date(comment.createdAt).toLocaleString()}</span>
//                 <span>Trả lời</span>
//               </div>
//             </div>
//             <div className="like-icon" onClick={() => toggleLike(comment._id)}>
//               <i
//                 className={likedStates[comment._id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
//                 style={{
//                   color: likedStates[comment._id] ? '#ff2e63' : '#74C0FC',
//                 }}
//               ></i>
//             </div>
//           </div>
//         ))}
//         {visibleCount < comments.length && (
//           <div className="view-replies" onClick={handleLoadMore}>
//             Xem thêm
//           </div>
//         )}
//       </div>

//       <div className="comment-footer">
//         <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="Thêm bình luận..."
//             value={commentInput}
//             onChange={(e) => setCommentInput(e.target.value)}
//           />
//           <button className="emoji-button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
//             <i className="fa-regular fa-face-smile"></i>
//           </button>
//         </div>
//         <button onClick={handleSubmitComment} disabled={isSubmitting}>
//           {isSubmitting ? 'Đang gửi...' : 'Đăng'}
//         </button>
//       </div>

//       {showEmojiPicker && (
//         <div className="emoji-picker-container" ref={emojiPickerRef}>
//           <EmojiPicker onEmojiClick={onEmojiClick} />
//         </div>
//       )}
//     </Modal>
//   );
// }

// export default CommentModal;




import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';
import './CommentModal.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

Modal.setAppElement('#root');

function CommentModal({ isOpen, onClose, videoId, onCommentAdded }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [likedStates, setLikedStates] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentBodyRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Fetch comment khi mở modal
  useEffect(() => {
    if (isOpen && videoId) {
      fetch(`http://localhost:5000/comments/${videoId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          setVisibleCount(5);
        })
        .catch((err) => console.error('Lỗi khi fetch comment:', err));
    }
  }, [isOpen, videoId]);

  // Đóng emoji khi click ngoài
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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

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

  const handleSubmitComment = async () => {
    if (!commentInput.trim()) return;

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = storedUser?._id;

    if (!currentUserId) {
      alert('Bạn cần đăng nhập để bình luận!');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          userId: currentUserId,
          content: commentInput,
        }),
      });

      const newComment = await res.json();

      // ✅ Cập nhật comment mới vào UI
      setComments((prev) => [newComment, ...prev]);
      setCommentInput('');

      // ✅ Gọi callback để Home tăng commentsCount
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error('Lỗi khi gửi bình luận:', err);
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="comment-item" key={comment._id}>
            <img
              src={comment.userId?.avatarUrl || '/images/avatar.png'}
              alt="avatar"
              className="avatar"
            />
            <div className="comment-info">
              <p className="username">{comment.userId?.username || 'Ẩn danh'}</p>
              <p className="text">{comment.content}</p>
              <div className="comment-meta">
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                <span>Trả lời</span>
              </div>
            </div>
            <div className="like-icon" onClick={() => toggleLike(comment._id)}>
              <i
                className={likedStates[comment._id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                style={{
                  color: likedStates[comment._id] ? '#ff2e63' : '#74C0FC',
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
          <button className="emoji-button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <i className="fa-regular fa-face-smile"></i>
          </button>
        </div>
        <button onClick={handleSubmitComment} disabled={isSubmitting}>
          {isSubmitting ? 'Đang gửi...' : 'Đăng'}
        </button>
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
