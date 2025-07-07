// import React, { useState, useRef } from 'react';
// import CommentModal from '~/components/CommentModal/CommentModal'; // <--- Thay đổi ở đây
// import SendToModal from '~/components/SendToModal/SendToModal';
// import './Home.scss';
// import '~/components/SendToModal/SendToModal.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { useNavigate } from 'react-router-dom';
// import config from '~/config';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

// function Home() {
//     const [videos, setVideos] = useState([
//         { id: 1, isLiked: false, isBookmarked: false, isFollowed: false },
//         { id: 2, isLiked: false, isBookmarked: false, isFollowed: false },
//         { id: 1, isLiked: false, isBookmarked: false, isFollowed: false },
//         { id: 2, isLiked: false, isBookmarked: false, isFollowed: false },
//         { id: 1, isLiked: false, isBookmarked: false, isFollowed: false },
//         { id: 2, isLiked: false, isBookmarked: false, isFollowed: false },
//     ]);

//     const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
//     const [isSendToOpen, setIsSendToOpen] = useState(false);
//     const [bookmarkMessage, setBookmarkMessage] = useState('');
//     const containerRef = useRef(null);
//     const navigate = useNavigate();

//     const handleLikeClick = (id) => {
//         setVideos((prev) =>
//             prev.map((video) => (video.id === id ? { ...video, isLiked: !video.isLiked } : video))
//         );
//     };

//     const handleBookmarkClick = (id) => {
//         setVideos((prev) =>
//             prev.map((video) => (video.id === id ? { ...video, isBookmarked: !video.isBookmarked } : video))
//         );

//         const video = videos.find((video) => video.id === id);
//         if (!video.isBookmarked) {
//             setBookmarkMessage('Bạn đã lưu video này!');
//         } else {
//             setBookmarkMessage('Bạn đã bỏ lưu video này!');
//         }

//         setTimeout(() => {
//             setBookmarkMessage('');
//         }, 3000);
//     };

//     const handleFollowClick = (id) => {
//         setVideos((prev) =>
//             prev.map((video) => (video.id === id ? { ...video, isFollowed: !video.isFollowed } : video))
//         );
//     };

//     const handleCommentClick = () => setIsCommentModalOpen(true);
//     const handleCloseModal = () => setIsCommentModalOpen(false);

//     return (
//         <div className="home-wrapper" ref={containerRef}>
//             {videos.map((video, index) => (
//                 <div key={index} className="video-container">
//                     <video className="video-player" src={`/videos/video${video.id}.mp4`} controls autoPlay loop></video>
//                     <div
//                         className="video-info-icon"
//                         onClick={() => navigate(config.routes.videoDetail)}
//                     >
//                         <FontAwesomeIcon icon={faEye} style={{ color: '#000000' }} />
//                     </div>
//                     <div className="action-sidebar">
//                         <div className="action-item">
//                             <img
//                                 src="/images/avatar.png"
//                                 alt="avatar"
//                                 className="avatar"
//                                 onClick={() => navigate(config.routes.profile)}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <div
//                                 className={`plus-icon ${video.isFollowed ? 'followed' : ''}`}
//                                 onClick={() => handleFollowClick(video.id)}
//                             >
//                                 {video.isFollowed ? (
//                                     <i className="fa-solid fa-check" style={{ color: '#e70d39' }}></i>
//                                 ) : (
//                                     <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="action-item">
//                             <div className="icon-wrapper" onClick={() => handleLikeClick(video.id)}>
//                                 <i className={`fa-solid fa-heart icon ${video.isLiked ? 'liked' : ''}`}></i>
//                             </div>
//                             <span>40.4K</span>
//                         </div>

//                         <div className="action-item">
//                             <div className="icon-wrapper" onClick={handleCommentClick}>
//                                 <i className="fa-solid fa-comment icon"></i>
//                             </div>
//                             <span>380</span>
//                         </div>

//                         <div className="action-item">
//                             <div className="icon-wrapper" onClick={() => handleBookmarkClick(video.id)}>
//                                 <i className={`fa-solid fa-bookmark icon ${video.isBookmarked ? 'bookmarked' : ''}`}></i>
//                             </div>
//                             <span>4620</span>
//                         </div>

//                         <div className="action-item">
//                             <div className="icon-wrapper" onClick={() => setIsSendToOpen(true)}>
//                                 <i className="fa-solid fa-share icon"></i>
//                             </div>
//                             <span>1418</span>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseModal} />
//             <SendToModal isOpen={isSendToOpen} onClose={() => setIsSendToOpen(false)} />

//             <div className="scroll-buttons">
//                 <button onClick={() => containerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}>
//                     <i className="fa-solid fa-chevron-up"></i>
//                 </button>
//                 <button onClick={() => containerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
//                     <i className="fa-solid fa-chevron-down"></i>
//                 </button>
//             </div>

//             {bookmarkMessage && (
//                 <div className="bookmark-message">
//                     {bookmarkMessage}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Home;




import React, { useState, useRef, useEffect } from 'react';
import CommentModal from '~/components/CommentModal/CommentModal';
import SendToModal from '~/components/SendToModal/SendToModal';
import './Home.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [videos, setVideos] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isSendToOpen, setIsSendToOpen] = useState(false);
  const [bookmarkMessage, setBookmarkMessage] = useState('');
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((video) => ({
          ...video,
          isLiked: false,
          isBookmarked: false,
          isFollowed: false,
        }));
        setVideos(formatted);
      })
      .catch((err) => console.error('Lỗi khi fetch video:', err));
  }, []);

const handleLikeClick = async (id) => {
  const video = videos.find((v) => v._id === id);
  const isCurrentlyLiked = video.isLiked;

  try {
    const res = await fetch(`http://localhost:5000/videos/${id}/${isCurrentlyLiked ? 'unlike' : 'like'}`, {
      method: 'PATCH',
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
  }
};



  const handleBookmarkClick = (id) => {
    setVideos((prev) =>
      prev.map((video) => (video._id === id ? { ...video, isBookmarked: !video.isBookmarked } : video))
    );

    const video = videos.find((video) => video._id === id);
    if (!video?.isBookmarked) {
      setBookmarkMessage('Bạn đã lưu video này!');
    } else {
      setBookmarkMessage('Bạn đã bỏ lưu video này!');
    }

    setTimeout(() => setBookmarkMessage(''), 3000);
  };

  const handleFollowClick = (id) => {
    setVideos((prev) =>
      prev.map((video) => (video._id === id ? { ...video, isFollowed: !video.isFollowed } : video))
    );
  };

  const handleCommentClick = () => setIsCommentModalOpen(true);
  const handleCloseModal = () => setIsCommentModalOpen(false);

  return (
    <div className="home-wrapper" ref={containerRef}>
      {videos.map((video) => (
        <div key={video._id} className="video-container">
          <video className="video-player" src={video.videoUrl} controls autoPlay loop></video>

          <div className="video-info-icon" onClick={() => navigate(config.routes.videoDetail)}>
            <FontAwesomeIcon icon={faEye} style={{ color: '#000000' }} />
          </div>

          <div className="action-sidebar">
            <div className="action-item">
              <img
                src={video.userId?.avatarUrl || '/images/avatar.png'}
                alt="avatar"
                className="avatar"
                onClick={() => navigate(config.routes.profile)}
                style={{ cursor: 'pointer' }}
              />
              <div
                className={`plus-icon ${video.isFollowed ? 'followed' : ''}`}
                onClick={() => handleFollowClick(video._id)}
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
              <div className="icon-wrapper" onClick={handleCommentClick}>
                <i className="fa-solid fa-comment icon"></i>
              </div>
              <span>{video.commentsCount}</span>
            </div>

            <div className="action-item">
              <div className="icon-wrapper" onClick={() => handleBookmarkClick(video._id)}>
                <i className={`fa-solid fa-bookmark icon ${video.isBookmarked ? 'bookmarked' : ''}`}></i>
              </div>
              <span>4620</span>
            </div>

            <div className="action-item">
              <div className="icon-wrapper" onClick={() => setIsSendToOpen(true)}>
                <i className="fa-solid fa-share icon"></i>
              </div>
              <span>1418</span>
            </div>
          </div>
        </div>
      ))}

      <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseModal} />
      <SendToModal isOpen={isSendToOpen} onClose={() => setIsSendToOpen(false)} />

      <div className="scroll-buttons">
        <button onClick={() => containerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
        <button onClick={() => containerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>

      {bookmarkMessage && (
        <div className="bookmark-message">
          {bookmarkMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
