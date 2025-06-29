import React, { useRef, useState, useEffect } from 'react';
import './MessageDetail.scss';
import { Smile, Image } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useLocation } from 'react-router-dom';

export default function MessageDetail() {
  const location = useLocation();
  const { name, avatar } = location.state || { name: 'user123', avatar: null };

  const [messages, setMessages] = useState([
    { side: 'left', type: 'text', text: 'Chào bạn 👋' },
    { side: 'right', type: 'text', text: 'Hello! Có gì mới không?' },
    { side: 'left', type: 'text', text: 'Tối nay đi xem phim không?' },
    { side: 'right', type: 'text', text: 'Đi chứ! 😄' },
    { side: 'left', type: 'text', text: '7h CGV nhé 🍿' },
    { side: 'right', type: 'text', text: 'Ok luôn. Gặp tại đó nha.' },
    {
      side: 'left',
      type: 'image',
      fileUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=300&q=80'
    },
    { side: 'right', type: 'text', text: 'Đẹp thế! Bạn mới chụp à?' },
    { side: 'left', type: 'text', text: 'Ừ, sáng nay đó 😁' },
  ]);

  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [viewImage, setViewImage] = useState(null); // ⭐

  const fileRef = useRef(null);
  const endRef = useRef(null);
  const emojiRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { side: 'right', type: 'text', text: input }]);
    setInput('');
  };

  const handleImageSend = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setMessages([...messages, { side: 'right', type: 'image', fileUrl: imageUrl }]);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <div className="chat-container">
      {/* HEADER */}
      <div className="chat-header">
        {avatar && <img src={avatar} alt="avatar" className="chat-avatar" />}
        <span>{name}</span>
      </div>

      {/* MESSAGE CONTENT */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div className={`message ${msg.side}`} key={i}>
            {msg.type === 'text' && msg.text}
            {msg.type === 'image' && (
              <img
                src={msg.fileUrl}
                alt="sent"
                className="sent-image"
                onClick={() => setViewImage(msg.fileUrl)} // 👈 phóng to ảnh
              />
            )}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* INPUT AREA */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={() => fileRef.current.click()}><Image size={20} /></button>
        <button onClick={() => setShowEmoji(!showEmoji)}><Smile size={20} /></button>
        <button className="send-btn" onClick={handleSend}>Gửi</button>

        {showEmoji && (
          <div className="emoji-picker" ref={emojiRef}>
            <EmojiPicker onEmojiClick={(e) => {
              setInput(input + e.emoji);
              setShowEmoji(false);
            }} />
          </div>
        )}

        <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleImageSend} />
      </div>

      {/* OVERLAY IMAGE VIEW */}
      {viewImage && (
        <div className="image-overlay" onClick={() => setViewImage(null)}>
          <img src={viewImage} alt="zoom" className="zoomed-image" />
        </div>
      )}
    </div>
  );
}
