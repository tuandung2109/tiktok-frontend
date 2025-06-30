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

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';

library.add(fab);

export default function VideoDetail() {
  const [activeTab, setActiveTab] = useState('comments');
  const [comment, setComment] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

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
      console.log('Gửi:', comment);
      setComment('');
    }
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
      </div>

      <div className="info-section light-mode">
        <div className="user-info">
          <img
            className="avatar"
            src="https://i.pravatar.cc/100"
            alt="avatar"
          />
          <div className="user-meta">
            <div className="username">
              nhuy144111 <span className="follow">Follow</span>
            </div>
            <div className="caption">Ét o ét 🥺🙏 #Boxbilliards</div>
            <div className="music">🎵 nhạc nền - Như Ý 👑</div>
          </div>
        </div>

        {/* ✅ Action buttons chia thành 2 nhóm rõ ràng */}
        <div className="action-buttons-horizontal">
          <div className="action-group1">
            <div className="action-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <span>9773</span>
            </div>
            <div className="action-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faCommentDots} />
              </div>
              <span>34</span>
            </div>
            <div className="action-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faBookmark} />
              </div>
              <span>205</span>
            </div>
          </div>

          <div className="action-group2">
            <div className="icon-circle yellow">
              <FontAwesomeIcon icon={faRetweet} />
            </div>
            <div className="icon-circle dark">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="icon-circle pink">
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <div className="icon-circle facebook">
              <FontAwesomeIcon icon={['fab', 'facebook']} />
            </div>
            <div className="icon-circle whatsapp">
              <FontAwesomeIcon icon={['fab', 'whatsapp']} />
            </div>
            <div className="icon-circle">
              <FontAwesomeIcon icon={faShare} />
            </div>
          </div>
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'comments' ? 'active' : ''}
            onClick={() => setActiveTab('comments')}
          >
            Bình luận
          </button>
          <button
            className={activeTab === 'creator' ? 'active' : ''}
            onClick={() => setActiveTab('creator')}
          >
            Video của creator
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'comments' ? (
            <div className="comments-section">
              <div className="comment">
                <span className="comment-user">Trần Quang Đại:</span> Ae đừng
                giúp, để như ý lấy trung anh 🤣🤣
                <div className="reply">
                  <span className="comment-user">Như Ý 👑:</span> Không thấy 1
                  ai luôn...
                </div>
              </div>
              <div className="comment">
                <span className="comment-user">...</span> content để rước trung
                anh về nhà 🤣
              </div>
              <div className="comment">
                <span className="comment-user">Mạnh Tiến Nguyễn:</span> Sao ko
                ai hóng Như Ý có bạn bi a mới nhỉ?
              </div>
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
      </div>
    </div>
  );
}
