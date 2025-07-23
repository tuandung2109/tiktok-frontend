import React, { useState, useRef, useEffect, useCallback } from 'react';
import './VideoDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  faHeart,
  faCommentDots,
  faBookmark,
  faRetweet,
  faCode,
  faPaperPlane,
  faShare,
  faTimes,
  faEllipsisH,
  faExpand,
  faVolumeUp,
  faVolumeMute,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { Heart as HeartIcon, Smile } from 'lucide-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import CommentModal from '~/components/CommentModal/CommentModal';
import { useParams } from 'react-router-dom';

library.add(fab);

export default function VideoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  // const video = location.state?.video || {};
  const [video, setVideo] = useState(location.state?.video || null);
  const [videos, setVideos] = useState(location.state?.videos || []);
  const { id } = useParams();

  // console.log('🎥 video:', location.state?.video);

  // const [video, setVideo] = useState(initialVideo);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (video && videos.length > 0) {
      const index = videos.findIndex(v => v._id === video._id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [video, videos]);


  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const [activeTab, setActiveTab] = useState('comments');
  const [commentInputText, setCommentInputText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(video.isLiked || false);
  const [likeCount, setLikeCount] = useState(video.likesCount || 0);
  const [allComments, setAllComments] = useState([]);
  const [bookmarked, setBookmarked] = useState(video.isBookmarked || false);
  // const [bookmarkCount, setBookmarkCount] = useState(video.bookmarksCount || 0);
  const [showBookmarkMsg, setShowBookmarkMsg] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [showDevMsg, setShowDevMsg] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Vẫn dùng state này để kiểm soát active class

  const videoRef = useRef(null);
  const emojiRef = useRef(null);
  const volumeButtonRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const fromProfile = location.state?.fromProfile || false;



  const fetchComments = useCallback(async () => {
    if (!video._id) return;
    try {
      const res = await fetch(`http://localhost:5000/comments/${video._id}${userId ? `?userId=${userId}` : ''}`);
      const data = await res.json();
      const comments = data.map(c => ({
        ...c,
        user: c.userId?.username || 'Ẩn danh',
        avatar: c.userId?.avatarUrl || 'https://i.pravatar.cc/40?img=1',
        text: c.content,
        time: c.createdAt ? new Date(c.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Vừa xong',
        likes: c.likesCount || 0,
        liked: c.isLikedByCurrentUser || false,
      }));
      setAllComments(comments);
    } catch (err) {
      console.error('Fetch comments failed:', err);
    }
  }, [video._id, userId]);

  const changeVideo = async (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < videos.length) {
      const newVideo = videos[newIndex];
      const isFollowingNewUser = await checkFollowStatus(newVideo);

      setVideo(newVideo);
      setCurrentIndex(newIndex);
      setIsFollowing(isFollowingNewUser);
    }
  };


  useEffect(() => {
    fetchComments(); // refetch khi video thay đổi
    setLiked(video.isLiked || false);
    setLikeCount(video.likesCount || 0);
    setBookmarked(video.isBookmarked || false);
    // setBookmarkCount(video.bookmarksCount || 0);
  }, [video]);


  // 👇 Đặt bên ngoài VideoDetail()
  const checkFollowStatus = async (v, userId) => {
    if (!userId || !v.userId?._id || userId === v.userId._id) return false;
    try {
      const res = await fetch('http://localhost:5000/follows/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followerId: userId, followingId: v.userId._id }),
      });
      const data = await res.json();
      return data.isFollowing;
    } catch (err) {
      console.error('❌ Lỗi khi kiểm tra follow:', err);
      return false;
    }
  };


  useEffect(() => {
    const fetchFollow = async () => {
      const status = await checkFollowStatus(video, userId);
      setIsFollowing(status);
    };
    fetchFollow();
  }, [video, userId]);


  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  useEffect(() => {
    const handler = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };
    if (showEmoji) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showEmoji]);

  // useEffect để đóng volume slider khi click ra ngoài vẫn giữ nguyên
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        volumeButtonRef.current &&
        !volumeButtonRef.current.contains(event.target) &&
        volumeSliderRef.current &&
        !volumeSliderRef.current.contains(event.target)
      ) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // New useEffect for video progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const updateProgress = () => {
      if (v.duration) { // Ensure duration is available to avoid NaN
        setProgress((v.currentTime / v.duration) * 100);
      }
    };
    v.addEventListener('timeupdate', updateProgress);
    return () => v.removeEventListener('timeupdate', updateProgress);
  }, []);



  useEffect(() => {
    if ((!video || !video.userId) && id) {
      fetch(`http://localhost:5000/videos/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log('📥 Full fetched video:', data); // ✅ Xem data có userId không
          setVideo(data);
        })
        .catch(err => console.error('❌ Failed to fetch video by ID:', err));
    }
  }, [video, id]);



  // New function for click to play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSendComment = async () => {
    if (!commentInputText.trim() || !userId || !video._id) return;
    try {
      const res = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, videoId: video._id, content: commentInputText })
      });
      const newComment = await res.json();
      if (res.ok) {
        const display = {
          _id: newComment._id,
          user: newComment.userId?.username || 'Bạn',
          avatar: newComment.userId?.avatarUrl || '/images/avatar.png',
          text: newComment.content,
          time: new Date(newComment.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          likes: 0,
          liked: false,
        };
        setAllComments([display, ...allComments]);
        setCommentInputText('');
        setShowEmoji(false);
      }
    } catch (err) {
      console.error('Send comment failed:', err);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && volume === 0) {
        videoRef.current.volume = 1;
        setVolume(1);
      } else if (newMutedState) {
        videoRef.current.volume = 0;
        setVolume(0);
      }
    }
    // Chuyển đổi trạng thái hiển thị của slider khi click vào nút mute/unmute
    setShowVolumeSlider(prev => !prev); // Vẫn toggle state này
  };

  const handleVolumeChange = (e) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleBookmark = async () => {
    if (!userId || !video._id) return;
    const isCurrentlyBookmarked = bookmarked;
    try {
      const method = isCurrentlyBookmarked ? 'DELETE' : 'POST';
      const endpoint = 'http://localhost:5000/bookmarks';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, videoId: video._id }),
      });
      if (res.ok) {
        setBookmarked(!isCurrentlyBookmarked);
        // setBookmarkCount(prev => isCurrentlyBookmarked ? prev - 1 : prev + 1);
        setShowBookmarkMsg(true);
        setTimeout(() => setShowBookmarkMsg(false), 2000);
      } else {
        console.error('Lỗi khi toggle bookmark:', await res.json());
      }
    } catch (err) {
      console.error('Lỗi khi toggle bookmark:', err);
    }
  };

  const handleDevFeature = () => {
    setShowDevMsg(true);
    setTimeout(() => setShowDevMsg(false), 2000);
  };

  const handleLikeVideo = async () => {
    if (!userId || !video._id) return;
    try {
      const res = await fetch(`http://localhost:5000/videos/${video._id}/${liked ? 'unlike' : 'like'}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const updatedVideo = await res.json();
      if (res.ok) {
        setLiked(!liked);
        setLikeCount(updatedVideo.likesCount);
      } else {
        console.error('Failed to toggle like:', updatedVideo);
      }
    } catch (err) {
      console.error('Lỗi khi toggle like video:', err);
    }
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
    fetchComments();
  };

  const handleToggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
          videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          videoRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  return (
    <div className="video-detail-wrapper">
      <div className="video-section">
        <video
          ref={(el) => {
            videoRef.current = el; // vẫn giữ ref gốc để điều khiển
            if (el) {
              el.onloadedmetadata = () => {
                el.classList.remove('fit-cover', 'fit-contain');
                const isPortrait = el.videoHeight > el.videoWidth;
                el.classList.add(isPortrait ? 'fit-cover' : 'fit-contain');
              };
            }
          }}
          className="detail-video-player"
          src={video.videoUrl || video.url}
          controls={false}
          autoPlay
          loop
          onClick={handleVideoClick}
        />

        {/* Custom Progress Bar */}
        <div className="custom-progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        <button className="video-control close-btn" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button className="video-control menu-btn" onClick={() => alert("Open menu")}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>

        {/* Các nút điều khiển ở dưới cùng bên phải, nằm cùng hàng */}
        <div className="bottom-right-controls">
          <button className="video-control fullscreen-btn" onClick={handleToggleFullscreen}>
            <FontAwesomeIcon icon={faExpand} />
          </button>
          <button className="video-control volume-btn" onClick={handleToggleMute} ref={volumeButtonRef}>
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
        </div>

        {/* Slider âm lượng, luôn render nhưng ẩn/hiện bằng CSS */}
        <div className={`volume-slider-vertical ${showVolumeSlider ? 'is-active' : ''}`} ref={volumeSliderRef}>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            orient="vertical"
          />
        </div>

        {!fromProfile && (
          <div className="vertical-nav-buttons">
            <button className="vertical-nav-btn" onClick={() => changeVideo(-1)}>
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button className="vertical-nav-btn" onClick={() => changeVideo(1)}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        )}
      </div>

      <div className="info-section light-mode">
        <div className="user-info">
          <img
            className="avatar"
            src={video.userId?.avatarUrl || '/images/avatar.png'}
            alt="avatar"
          />

          <div className="user-meta">
            <div className="user-row">
              <div className="user-names">
                <div className="username">@{video.userId?.username || 'catchla_gapgau'}</div>
                <div className="displayname">{video.userId?.displayName || 'Tiktok - My project'} · 10h ago</div>
              </div>

              <button
                className={`follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={async () => {
                  if (!userId || userId === video.userId?._id) return;

                  const method = isFollowing ? 'DELETE' : 'POST';

                  try {
                    await fetch('http://localhost:5000/follows', {
                      method,
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        followerId: userId,
                        followingId: video.userId._id,
                      }),
                    });

                    setIsFollowing(!isFollowing);
                  } catch (err) {
                    console.error('❌ Lỗi khi toggle follow:', err);
                  }
                }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>


            </div>
            <div className="caption">
              {video.caption || 'Chào mừng đến với tiktok nha 😆😝'} <br />
              <span className="hashtags">{video.hashtags || '#tiktok #tiktok'}</span>
            </div>
            <div className="music">🎵 nhạc nền - bản quyền - tiktok</div>
          </div>
        </div>

        <div className="action-buttons-horizontal">
          <div className="action-group1">
            <div className="action-item">
              <div
                className={`icon-circle heart${liked ? ' liked' : ''}`}
                onClick={handleLikeVideo}
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
              <span>{allComments.length}</span>
            </div>
            <div className="action-item">
              <div className={`icon-circle bookmark${bookmarked ? ' bookmarked' : ''}`} onClick={handleBookmark}>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
              <span>Save</span>
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
            <strong>Comments ({allComments.length})</strong>
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
                <div key={comment._id || index} className="comment full-comment">
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
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
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
            value={commentInputText}
            onChange={(e) => setCommentInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
          />
          <button onClick={() => setShowEmoji(!showEmoji)}>
            <Smile size={20} />
          </button>
          <button className="send-button" onClick={handleSendComment}>
            Gửi
          </button>

          {showEmoji && (
            <div className="emoji-picker" ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={(e) => setCommentInputText((prev) => prev + e.emoji)}
              />
            </div>
          )}
        </div>

        {showBookmarkMsg && (
          <div className="mini-bookmark-msg">Đã lưu video vào bookmark!</div>
        )}
        {showCopyMsg && (
          <div className="mini-copy-msg">Đã sao chép liên kết!</div>
        )}
        {showDevMsg && (
          <div className="mini-copy-msg">Chức năng đang được phát triển</div>
        )}
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={handleCloseCommentModal}
        videoId={currentVideoId}
        onCommentAdded={fetchComments}
      />
    </div>
  );
}