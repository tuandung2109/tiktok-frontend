import React, { useState, useRef, useEffect } from 'react';
import './VideoDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCommentDots,
  faBookmark,
  faRetweet,
  faCode,
  faPaperPlane,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { Heart as HeartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';

// Import the additional icons needed for video controls
import { faTimes, faSearch, faEllipsisV, faArrowLeft, faArrowRight, faExpand, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faTimes, faSearch, faEllipsisV, faArrowLeft, faArrowRight, faExpand, faVolumeUp, faChevronUp, faChevronDown, faEllipsisH);

library.add(fab);

export default function VideoDetail() {
  const navigate = useNavigate();

    const fakeComments = [
      {
        user: "Trần Quang Đại",
        avatar: "https://i.pravatar.cc/40?img=1",
        text: "Phần comment chỉ mang tính chất tượng trưng thoai 🤣🤣",
        reply: { user: "Như Ý 👑", text: "Reply commnent no1" },
        likes: 0, // thêm dòng này
      },  
      {
        user: "Đinh Tuấn Dũng",
        avatar: "https://i.pravatar.cc/40?img=1",
        text: "content để rước trung anh về nhà 🤣",
        likes: 0, // thêm dòng này
      },
      {
        user: "Mạnh Tiến Nguyễn",
        avatar: "https://i.pravatar.cc/40?img=1",
        text: "Sao ko ai hóng Như Ý có bạn bi a mới nhỉ?",
        likes: 0, // thêm dòng này
      },
        {
        user: "Nguyễn Vân Anh",
        avatar: "https://i.pravatar.cc/40?img=1",
        time: "2 giờ trước",
        text: "Ae đừng giúp, để như ý lấy trung anh 🤣🤣",
        likes: 10,
        reply: {
          user: "Như Ý 👑",
          text: "Không thấy 1 ai luôn...",
          time: "1 giờ trước",
        },
      },
    ];

  const [activeTab, setActiveTab] = useState('comments');
  const [comment, setComment] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(9773);
  const [allComments, setAllComments] = useState(fakeComments);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(205);
  const [showBookmarkMsg, setShowBookmarkMsg] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [showDevMsg, setShowDevMsg] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };
    if (showEmoji) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoji]);

const handleSend = () => {
  if (comment.trim()) {
    const newComment = {
      user: "Bạn",
      text: comment,
      time: "Vừa xong",
      avatar: "/images/avatar.png", // Thay bằng URL ảnh đại diện của bạn
      likes: 0,
    };
    setAllComments([newComment, ...allComments]);
    setComment('');
    setShowEmoji(false);
  }
};

const handleBookmark = () => {
  if (!bookmarked) { // chỉ khi chuyển sang bookmarked
    setBookmarked(true);
    setBookmarkCount((prev) => prev + 1);
    setShowBookmarkMsg(true);
    setTimeout(() => setShowBookmarkMsg(false), 2000);
  } else {
    setBookmarked(false);
    setBookmarkCount((prev) => prev - 1);
    // Không hiện thông báo khi bỏ bookmark
  }
};

const handleDevFeature = () => {
  setShowDevMsg(true);
  setTimeout(() => setShowDevMsg(false), 2000);
};

  return (
    <div className="video-detail-wrapper">
      <div className="video-section">
          <video
            className="detail-video-player"
            src="/videos/video1.mp4"
            controls
            autoPlay
            loop
          ></video>
          {/* Close button */}
          <button className="video-control close-btn" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {/* Menu button */}
          <button className="video-control menu-btn" onClick={() => alert("Open menu")}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          {/* Full-screen toggle */}
          <button className="video-control fullscreen-btn" onClick={() => alert("Toggle fullscreen")}>
            <FontAwesomeIcon icon={faExpand} />
          </button>
          {/* Volume control */}
          <button className="video-control volume-btn" onClick={() => alert("Toggle volume")}>
            <FontAwesomeIcon icon={faVolumeUp} />
          </button>

          {/* New vertical nav buttons */}
          <div className="vertical-nav-buttons">
            <button className="vertical-nav-btn" onClick={() => alert("Previous video")}>
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button className="vertical-nav-btn" onClick={() => alert("Next video")}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
      </div>

      <div className="info-section light-mode">
        <div className="user-info">
          <img
            className="avatar"
            src="https://i.pravatar.cc/100"
            alt="avatar"
          />
          <div className="user-meta">
            <div className="user-row">
              <div className="user-names">
                <div className="username">@catchla_gapgau</div>
                <div className="displayname">Tiktok - My project · 10h ago</div>
              </div>
              
              <button
                className={`follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              
            </div>
            <div className="caption">
              Chào mừng đến với tiktok nha 😆😝  <br />
              <span className="hashtags">#tiktok #tiktok</span>
            </div>
            <div className="music">🎵 nhạc nền - bản quyền - tiktok</div>
          </div>
        </div>


        {/* ✅ Action buttons chia thành 2 nhóm rõ ràng */}
        <div className="action-buttons-horizontal">
          <div className="action-group1">
            <div className="action-item">
              <div
                className={`icon-circle heart${liked ? ' liked' : ''}`}
                onClick={() => {
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
                }}
                style={{ color: liked ? '#fe2c55' : undefined }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <span>{likeCount}</span>
            </div>
            <div className="action-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faCommentDots} />
              </div>
              <span>34</span>
            </div>
            <div className="action-item">
              <div className={`icon-circle bookmark${bookmarked ? ' bookmarked' : ''}`} onClick={handleBookmark}>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
              <span>{bookmarkCount}</span>
            </div>
          </div>

          <div className="action-group2">
            <div className="icon-circle yellow" onClick={handleDevFeature}>
              <FontAwesomeIcon icon={faRetweet} />
            </div>
            <div className="icon-circle dark" onClick={handleDevFeature}>
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="icon-circle pink" onClick={handleDevFeature}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <div className="icon-circle facebook" onClick={handleDevFeature}>
              <FontAwesomeIcon icon={['fab', 'facebook']} />
            </div>
            <div className="icon-circle whatsapp" onClick={handleDevFeature}>
              <FontAwesomeIcon icon={['fab', 'whatsapp']} />
            </div>
            <div className="icon-circle" onClick={handleDevFeature}>
              <FontAwesomeIcon icon={faShare} />
            </div>
          </div>
        </div>

        <div className="video-link-wrapper">
          <input
            type="text"
            className="video-link"
            value="https://tiktok-frontend-ten.vercel.app/"
            readOnly
          />
          <button
            className="copy-link-button"
            onClick={() => {
              navigator.clipboard.writeText("https://www.tiktok.com/@catchla_gapgau/video/7521123456789");
              setShowCopyMsg(true);
              setTimeout(() => setShowCopyMsg(false), 2000);
            }}
          >
            Copy link
          </button>
        </div>
   

        <div className="tabs">
          <button
            className={activeTab === 'comments' ? 'active' : ''}
            onClick={() => setActiveTab('comments')}
          >
            <strong>Comments ({fakeComments.length})</strong>
          </button>

          <button
            className={activeTab === 'creator' ? 'active' : ''}
            onClick={() => setActiveTab('creator')}
          >
            Creator videos
          </button>

        </div>

        <div className="tab-content">
          {activeTab === 'comments' ? (
            <div className="comments-section">
              {allComments.map((comment, index) => (
                <div key={index} className="comment full-comment">
                  <img src={comment.avatar} alt="avatar" className="comment-avatar" />
                  <div className="comment-body">
                    <div className="comment-top">
                      <div className="comment-main">
                        <span className="comment-user">{comment.user}</span>
                        <span className="comment-text">{comment.text}</span>
                        <div className="comment-actions">
                          <span className="comment-time">{comment.time || "1h ago"}</span>
                          <span className="comment-reply">Reply</span>
                        </div>
                      </div>

                      <div
                        className={`comment-like-icon ${comment.liked ? 'liked' : ''}`}
                        onClick={() => {
                          const updatedComments = [...allComments];
                          updatedComments[index].liked = !updatedComments[index].liked;
                          updatedComments[index].likes += updatedComments[index].liked ? 1 : -1;
                          setAllComments(updatedComments);
                        }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }} // thêm dòng này
                      >
                        <HeartIcon
                          size={23}
                          color={comment.liked ? "#fe2c55" : "#111"}
                          fill={comment.liked ? "#fe2c55" : "#fff"}
                          strokeWidth={2}
                          style={{ transition: 'all 0.2s' }}
                        />
                        <span style={{ fontSize: 15 }}>{comment.likes}</span>
                      </div>
                    </div>

                    {comment.reply && (
                      <>
                        <div
                          className="view-reply"
                          onClick={() => {
                            const updatedComments = [...allComments];
                            updatedComments[index].showReply = !updatedComments[index].showReply;
                            setAllComments(updatedComments);
                          }}
                        >
                          {comment.showReply ? 'Hide reply' : 'View 1 reply'}
                        </div>
                        {comment.showReply && (
                          <div className="reply-comment">
                            <span className="comment-user">{comment.reply.user}</span>
                            <span className="comment-text">{comment.reply.text}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

          ) : (
            <div className="creator-videos">
              <p>Video khác của creator sẽ hiện ở đây...</p>
            </div>
          )}
        </div>

        <div className="comment-input-wrapper">
          <input
            type="text"
            className="comment-input"
            placeholder="Thêm bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={() => setShowEmoji(!showEmoji)}>
            <Smile size={20} />
          </button>
          <button className="send-button" onClick={handleSend}>
            Gửi
          </button>

          {showEmoji && (
            <div className="emoji-picker" ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={(e) => setComment((prev) => prev + e.emoji)}
              />
            </div>
          )}
        </div>

        {/* Mini thông báo bookmark */}
        {showBookmarkMsg && (
          <div className="mini-bookmark-msg">Đã lưu video vào bookmark!</div>
        )}
        {/* Mini thông báo copy link */}
        {showCopyMsg && (
          <div className="mini-copy-msg">Đã sao chép liên kết!</div>
        )}
        {/* Mini thông báo tính năng đang phát triển */}
        {showDevMsg && (
          <div className="mini-copy-msg">Chức năng đang được phát triển</div>
        )}
      </div>
    </div>
  );
}
