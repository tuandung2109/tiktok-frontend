import React, { useState } from 'react';
import './VideoDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare, faCopy } from '@fortawesome/free-solid-svg-icons';

export default function VideoDetail() {
  const [activeTab, setActiveTab] = useState('comments');

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
        {/* Header: User + Caption + Music */}
        <div className="user-info">
          <img
            className="avatar"
            src="https://i.pravatar.cc/100"
            alt="avatar"
          />
          <div className="user-meta">
            <div className="username">nhuy144111 <span className="follow">Follow</span></div>
            <div className="caption">Ét o ét 🥺🙏 #Boxbilliards</div>
            <div className="music">🎵 nhạc nền - Như Ý 👑</div>
          </div>
        </div>

        {/* Stats */}
        <div className="action-buttons">
          <div className="action-item">
            <FontAwesomeIcon icon={faHeart} />
            <span>218.3K</span>
          </div>
          <div className="action-item">
            <FontAwesomeIcon icon={faCommentDots} />
            <span>5179</span>
          </div>
          <div className="action-item">
            <FontAwesomeIcon icon={faShare} />
            <span>17.3K</span>
          </div>
          <div className="action-item">
            <FontAwesomeIcon icon={faCopy} />
            <span>Copy link</span>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Tab content */}
        {activeTab === 'comments' ? (
          <div className="comments-section">
            <div className="comment">
              <span className="comment-user">Trần Quang Đại:</span> Ae đừng giúp, để như ý lấy trung anh 🤣🤣
              <div className="reply"> <span className="comment-user">Như Ý 👑:</span> Không thấy 1 ai luôn...</div>
            </div>
            <div className="comment">
              <span className="comment-user">...</span> content để rước trung anh về nhà 🤣
            </div>
            <div className="comment">
              <span className="comment-user">Mạnh Tiến Nguyễn:</span> Sao ko ai hóng Như Ý có bạn bi a mới nhỉ?
            </div>
          </div>
        ) : (
          <div className="creator-videos">
            <p>Video khác của creator sẽ hiện ở đây...</p>
          </div>
        )}

        {/* Footer input */}
        <div className="comment-input-wrapper">
          <input
            type="text"
            className="comment-input"
            placeholder="Thêm bình luận..."
          />
          <button className="send-button">Gửi</button>
        </div>
      </div>
    </div>
  );
}
