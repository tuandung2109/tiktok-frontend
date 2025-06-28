// import './MessageDetail.scss';

// export default function MessageDetail() {
//   const messages = [
//     { side: 'left', text: 'Chào bạn 👋' },
//     { side: 'right', text: 'Hello! Có gì mới không?' },
//     { side: 'left', text: 'Tối nay đi xem phim không?' },
//     { side: 'right', text: 'Đi chứ! 😄' },
//     { side: 'left', text: 'Ok, 7h gặp nhé!' },
//     { side: 'right', text: 'Chuẩn luôn!' },
//     { side: 'left', text: 'Nhớ mặc đồ đẹp 😎' },
//     { side: 'right', text: 'Haha, ok' },
//   ];

//   return (
//     <div className="message-wrapper">
//       <div className="chat-header">
//         <h4 className="chat-title">user123</h4>
//       </div>

//       <div className="chat-content">
//         {messages.map((msg, i) => (
//           <div className={`message ${msg.side}`} key={i}>
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input-area">
//         <input type="text" placeholder="Nhắn tin..." />
//         <button>Gửi</button>
//       </div>
//     </div>
//   );
// }


// import './MessageDetail.scss';
// import { Image, Smile } from 'lucide-react';

// export default function MessageDetail() {
//   const messages = [
//     { side: 'left', text: 'Chào bạn 👋' },
//     { side: 'right', text: 'Hello! Có gì mới không?' },
//   ];

//   return (
//     <div className="message-wrapper">
//       <div className="chat-header">
//         <h4 className="chat-title">user123</h4>
//       </div>

//       <div className="chat-content">
//         {messages.map((msg, i) => (
//           <div className={`message ${msg.side}`} key={i}>
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input-area">
//         <input type="text" placeholder="Nhắn tin..." />

//         <button className="icon-btn">
//           <Image size={20} />
//         </button>
//         <button className="icon-btn">
//           <Smile size={20} />
//         </button>

//         <button className="send-btn">Gửi</button>
//       </div>
//     </div>
//   );
// }


import './MessageDetail.scss';
import { Image, Smile } from 'lucide-react';

export default function MessageDetail() {
  const messages = [
    { side: 'left', text: 'Chào bạn 👋' },
    { side: 'right', text: 'Hello! Có gì mới không?' },
    { side: 'left', text: 'Tối nay đi xem phim không?' },
    { side: 'right', text: 'Đi chứ! 😄' },
    { side: 'left', text: 'Ok, 7h gặp nhé!' },
    { side: 'right', text: 'Chuẩn luôn!' },
    { side: 'left', text: 'Nhớ mặc đồ đẹp 😎' },
    { side: 'right', text: 'Haha, ok' },
        { side: 'left', text: 'Chào bạn 👋' },
    { side: 'right', text: 'Hello! Có gì mới không?' },
    { side: 'left', text: 'Tối nay đi xem phim không?' },
    { side: 'right', text: 'Đi chứ! 😄' },
    { side: 'left', text: 'Ok, 7h gặp nhé!' },
    { side: 'right', text: 'Chuẩn luôn!' },
    { side: 'left', text: 'Nhớ mặc đồ đẹp 😎' },
    { side: 'right', text: 'Haha, ok' },
  ];

  return (
    <div className="message-wrapper">
      <div className="chat-header">
        <h4 className="chat-title">user123</h4>
      </div>

      <div className="chat-content">
        {messages.map((msg, i) => (
          <div className={`message ${msg.side}`} key={i}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input type="text" placeholder="Nhắn tin..." />

        <button className="icon-btn">
          <Image size={20} />
        </button>
        <button className="icon-btn">
          <Smile size={20} />
        </button>

        <button className="send-btn">Gửi</button>
      </div>
    </div>
  );
}
