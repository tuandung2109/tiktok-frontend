import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Messages.scss";

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '');
}

export default function Messages() {
  const storyRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [lastMessages, setLastMessages] = useState({});

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = storedUser?._id;

  // 🔹 Lấy danh sách users để hiển thị trong stories
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy user:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Lấy danh sách hội thoại và tin nhắn cuối cùng
  useEffect(() => {
    const fetchConversationsAndLastMessages = async () => {
      try {
        if (!currentUserId) return;

        const res = await axios.get(`http://localhost:5000/api/conversations/${currentUserId}`);
        const convs = res.data;
        setConversations(convs);

        // 🔸 Lấy last message của từng conversation
        const messagesMap = {};

        await Promise.all(convs.map(async (conv) => {
          try {
            const resMsg = await axios.get(`http://localhost:5000/api/messages/${conv._id}`);
            const msgs = resMsg.data;
            if (msgs.length > 0) {
              messagesMap[conv._id] = msgs[msgs.length - 1];
            }
          } catch (err) {
            console.error("Lỗi khi lấy tin nhắn cuối:", err);
          }
        }));

        setLastMessages(messagesMap);
      } catch (err) {
        console.error("Lỗi khi lấy hội thoại:", err);
      }
    };

    fetchConversationsAndLastMessages();
  }, [currentUserId]);

  const scrollStories = (direction) => {
    if (storyRef.current) {
      storyRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="messages-page">
      {/* STORIES */}
      <div className="stories-wrapper">
        <button className="scroll-btn left" onClick={() => scrollStories('left')}>
          <ChevronLeft />
        </button>

        <div className="stories" ref={storyRef}>
          {users
            .filter(user => user._id !== currentUserId)
            .map((user) => (
              <Link
                to={`/messages/${slugify(user.username)}`}
                state={{
                  partnerId: user._id,
                  name: user.username,
                  avatar: user.avatarUrl,
                }}
                className="story"
                key={user._id}
              >
                <div className="avatar-wrapper">
                  <img src={user.avatarUrl} alt={user.username} />
                </div>
              </Link>
            ))}
        </div>

        <button className="scroll-btn right" onClick={() => scrollStories('right')}>
          <ChevronRight />
        </button>
      </div>

      {/* MESSAGE LIST */}
      <div className="messages-list">
        {conversations.map((conv) => {
          const partnerId = conv.members.find(id => id !== currentUserId);
          const partner = users.find(u => u._id === partnerId);
          const lastMsg = lastMessages[conv._id];

          if (!partner) return null;

          return (
            <Link
              to={`/messages/${slugify(partner.username)}`}
              state={{
                partnerId: partner._id,
                name: partner.username,
                avatar: partner.avatarUrl,
              }}
              className="message-item"
              key={conv._id}
            >
              <img className="avatar" src={partner.avatarUrl} alt={partner.username} />
              <div className="message-content">
                <div className="top-row">
                  <h4>{partner.username}</h4>
                  <span className="time">
                    {new Date(conv.updatedAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="last-message">
                  {lastMsg
                    ? lastMsg.type === 'image'
                      ? '📷 Ảnh'
                      : lastMsg.text
                    : 'Chưa có tin nhắn'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
