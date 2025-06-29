import React, { useRef } from "react";
import { Bell, Users, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Messages.scss";

const mockMessages = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
    name: "Ctoi cần chuỗi nhóm",
    message: "mchi đã gửi một nhãn dán 😄",
    time: "3 giờ",
    badge: "38",
  },
  {
    id: 2,
    icon: <Bell size={18} />,
    type: "pink",
    name: "Hoạt động",
    message: "Tô là Hoàaa người mà bạn có thể…",
    time: "8 giờ",
  },
  {
    id: 3,
    icon: <Bell size={18} />,
    type: "dark",
    name: "Thông báo hệ thống",
    message: "LIVE: Bạn đã nhận được 50 lượt…",
    time: "16 giờ",
  },
  {
    id: 4,
    icon: <Users size={18} />,
    type: "blue",
    name: "Những Follower mới",
    message: "hug_trq đã bắt đầu follow bạn.",
    time: "3 ngày",
  },
  {
    id: 5,
    icon: <ShoppingBag size={18} />,
    type: "orange",
    name: "TikTok Shop",
    message: "Tin nhắn của người bán được gửi…",
    time: "3 ngày",
    badge: "2",
  },
    {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
    name: "Ctoi cần chuỗi nhóm",
    message: "mchi đã gửi một nhãn dán 😄",
    time: "3 giờ",
    badge: "38",
  },
    {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
    name: "Ctoi cần chuỗi nhóm",
    message: "mchi đã gửi một nhãn dán 😄",
    time: "3 giờ",
    badge: "38",
  },
    {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
    name: "Ctoi cần chuỗi nhóm",
    message: "mchi đã gửi một nhãn dán 😄",
    time: "3 giờ",
    badge: "38",
  },
    {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
    name: "Ctoi cần chuỗi nhóm",
    message: "mchi đã gửi một nhãn dán 😄",
    time: "3 giờ",
    badge: "38",
  },
];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '');
}

export default function Messages() {
  const storyRef = useRef(null);

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
          {[...Array(12)].map((_, i) => {
            const name = `User ${i + 1}`;
            const avatar = `https://i.pravatar.cc/100?img=${i + 10}`;
            return (
              <Link
                to={`/messages/user${i + 1}`}
                state={{ name, avatar }}
                className="story"
                key={i}
              >
                <div className="avatar-wrapper">
                  <img src={avatar} alt="" />
                  {(i === 2 || i === 3) && <div className="dot" />}
                </div>
                <span>{name}</span>
              </Link>
            );
          })}
        </div>

        <button className="scroll-btn right" onClick={() => scrollStories('right')}>
          <ChevronRight />
        </button>
      </div>

      {/* MESSAGE LIST */}
      <div className="messages-list">
        {mockMessages.map((msg) => (
          <Link
            to={`/messages/${slugify(msg.name)}`}
            state={{ name: msg.name, avatar: msg.avatar || null }}
            className="message-item"
            key={msg.id}
          >
            {msg.avatar ? (
              <img className="avatar" src={msg.avatar} alt="" />
            ) : (
              <div className={`icon-avatar ${msg.type}`}>{msg.icon}</div>
            )}

            <div className="message-content">
              <div className="top-row">
                <h4>{msg.name}</h4>
                <span className="time">{msg.time}</span>
              </div>
              <p>{msg.message}</p>
            </div>

            {msg.badge && <div className="badge">{msg.badge}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
