import React, { useRef, useState, useEffect } from 'react';
import './MessageDetail.scss';
import { Smile, Image } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MessageDetail() {
  const location = useLocation();
  const { name, avatar, partnerId } = location.state || {};
  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [viewImage, setViewImage] = useState(null);

  const fileRef = useRef(null);
  const endRef = useRef(null);
  const emojiRef = useRef(null);

  // 🔸 Tìm conversation nếu có sẵn (KHÔNG tạo)
  useEffect(() => {
    const fetchConversationAndMessages = async () => {
      if (!currentUserId || !partnerId) return;
      try {
        const resConv = await axios.get(`${process.env.REACT_APP_API_BASE}/api/conversations/${currentUserId}`);
        const existing = resConv.data.find((c) => c.members.includes(partnerId));
        if (existing) {
          setConversationId(existing._id);
          const resMsg = await axios.get(`${process.env.REACT_APP_API_BASE}/api/messages/${existing._id}`);
          setMessages(resMsg.data);
        }
      } catch (err) {
        console.error("❌ Lỗi khi tìm hội thoại:", err);
      }
    };

    fetchConversationAndMessages();
  }, [currentUserId, partnerId]);

  // 🔸 Gửi tin nhắn (tạo hội thoại nếu chưa có)
  const handleSend = async () => {
    if (input.trim() === '') return;
    try {
      let convId = conversationId;

      // Nếu chưa có hội thoại, tạo mới
      if (!conversationId) {
        const resNewConv = await axios.post("${process.env.REACT_APP_API_BASE}/api/conversations", {
          senderId: currentUserId,
          receiverId: partnerId,
        });
        convId = resNewConv.data._id;
        setConversationId(convId);
      }

      const newMsg = {
        conversationId: convId,
        senderId: currentUserId,
        text: input,
        type: 'text'
      };

      const res = await axios.post("${process.env.REACT_APP_API_BASE}/api/messages", newMsg);
      setMessages((prev) => [...prev, res.data]);
      setInput('');
    } catch (err) {
      console.error("❌ Lỗi gửi tin nhắn:", err);
    }
  };

const handleImageSend = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tiktok"); 

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dh2gw9dju/image/upload",
      formData
    );
    const imageUrl = response.data.secure_url;

    const res = await axios.post('${process.env.REACT_APP_API_BASE}/api/messages', {
      conversationId,
      senderId: currentUserId,
      type: 'image',
      text: '',
      fileUrl: imageUrl
    });

    setMessages((prev) => [...prev, res.data]);
  } catch (err) {
    console.error('Lỗi khi upload ảnh:', err);
  }
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
          <div
            className={`message ${msg.senderId === currentUserId ? 'right' : 'left'}`}
            key={msg._id || i}
          >
            {msg.type === 'text' && msg.text}
            {msg.type === 'image' && (
              <img
                src={msg.fileUrl}
                alt="sent"
                className="sent-image"
                onClick={() => setViewImage(msg.fileUrl)}
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
