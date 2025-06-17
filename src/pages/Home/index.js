// import React, { useState, useRef } from 'react';
// import CommentModal from './CommentModal/CommentModal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Home.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';

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
//     const containerRef = useRef(null);

//     const handleLikeClick = (id) => {
//         setVideos((prev) =>
//             prev.map((video) =>
//                 video.id === id ? { ...video, isLiked: !video.isLiked } : video
//             )
//         );
//     };

//     const handleBookmarkClick = (id) => {
//         setVideos((prev) =>
//             prev.map((video) =>
//                 video.id === id ? { ...video, isBookmarked: !video.isBookmarked } : video
//             )
//         );
//         const video = videos.find((video) => video.id === id);
//         if (!video.isBookmarked) {
//             toast.success('Bạn đã lưu video này!', { position: "bottom-right", autoClose: 3000 });
//         } else {
//             toast.info('Bạn đã bỏ lưu video này!', { position: "bottom-right", autoClose: 3000 });
//         }
//     };

//     const handleFollowClick = (id) => {
//         setVideos((prev) =>
//             prev.map((video) =>
//                 video.id === id ? { ...video, isFollowed: !video.isFollowed } : video
//             )
//         );
//     };

//     const handleCommentClick = () => setIsCommentModalOpen(true);
//     const handleCloseModal = () => setIsCommentModalOpen(false);

//     return (
//         <div className="home-wrapper" ref={containerRef}>
//             {videos.map((video, index) => (
//                 <div key={index} className="video-container">
//                     <video
//                         className="video-player"
//                         src={`/videos/video${video.id}.mp4`}
//                         controls
//                         autoPlay
//                         loop
//                     ></video>

//                     <div className="action-sidebar">
//                         <div className="action-item">
//                             <img src="/images/avatar.png" alt="avatar" className="avatar" />
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
//                             <div className="icon-wrapper">
//                                 <i className="fa-solid fa-share icon"></i>
//                             </div>
//                             <span>1418</span>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseModal} />
//             <ToastContainer />

//             <div className="scroll-buttons">
//                 <button onClick={() => containerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}>
//                     <i className="fa-solid fa-chevron-up"></i>
//                 </button>
//                 <button onClick={() => containerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
//                     <i className="fa-solid fa-chevron-down"></i>
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Home;


import React, { useState, useRef } from 'react';
import CommentModal from './CommentModal/CommentModal';
import SendToModal from './SendToModal/SendToModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.scss';
import './SendToModal/SendToModal.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
    const [videos, setVideos] = useState([
        { id: 1, isLiked: false, isBookmarked: false, isFollowed: false },
        { id: 2, isLiked: false, isBookmarked: false, isFollowed: false },
        { id: 1, isLiked: false, isBookmarked: false, isFollowed: false },
        { id: 2, isLiked: false, isBookmarked: false, isFollowed: false },
        { id: 1, isLiked: false, isBookmarked: false, isFollowed: false },
        { id: 2, isLiked: false, isBookmarked: false, isFollowed: false },
    ]);

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isSendToOpen, setIsSendToOpen] = useState(false);
    const containerRef = useRef(null);

    const handleLikeClick = (id) => {
        setVideos((prev) =>
            prev.map((video) =>
                video.id === id ? { ...video, isLiked: !video.isLiked } : video
            )
        );
    };

    const handleBookmarkClick = (id) => {
        setVideos((prev) =>
            prev.map((video) =>
                video.id === id ? { ...video, isBookmarked: !video.isBookmarked } : video
            )
        );
        const video = videos.find((video) => video.id === id);
        if (!video.isBookmarked) {
            toast.success('Bạn đã lưu video này!', { position: "bottom-right", autoClose: 3000 });
        } else {
            toast.info('Bạn đã bỏ lưu video này!', { position: "bottom-right", autoClose: 3000 });
        }
    };

    const handleFollowClick = (id) => {
        setVideos((prev) =>
            prev.map((video) =>
                video.id === id ? { ...video, isFollowed: !video.isFollowed } : video
            )
        );
    };

    const handleCommentClick = () => setIsCommentModalOpen(true);
    const handleCloseModal = () => setIsCommentModalOpen(false);

    return (
        <div className="home-wrapper" ref={containerRef}>
            {videos.map((video, index) => (
                <div key={index} className="video-container">
                    <video
                        className="video-player"
                        src={`/videos/video${video.id}.mp4`}
                        controls
                        autoPlay
                        loop
                    ></video>

                    <div className="action-sidebar">
                        <div className="action-item">
                            <img src="/images/avatar.png" alt="avatar" className="avatar" />
                            <div
                                className={`plus-icon ${video.isFollowed ? 'followed' : ''}`}
                                onClick={() => handleFollowClick(video.id)}
                            >
                                {video.isFollowed ? (
                                    <i className="fa-solid fa-check" style={{ color: '#e70d39' }}></i>
                                ) : (
                                    <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
                                )}
                            </div>
                        </div>

                        <div className="action-item">
                            <div className="icon-wrapper" onClick={() => handleLikeClick(video.id)}>
                                <i className={`fa-solid fa-heart icon ${video.isLiked ? 'liked' : ''}`}></i>
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
                            <div className="icon-wrapper" onClick={() => handleBookmarkClick(video.id)}>
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
            <ToastContainer />

            <div className="scroll-buttons">
                <button onClick={() => containerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}>
                    <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button onClick={() => containerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
            </div>
        </div>
    );
}

export default Home;
