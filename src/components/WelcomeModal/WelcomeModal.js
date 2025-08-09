import { useEffect, useState } from 'react';
import './WelcomeModal.scss';

function WelcomeModal({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng fade-in khi component được mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Kích hoạt hiệu ứng fade-out trước khi đóng
    setIsVisible(false);
    // Sau khi hiệu ứng kết thúc, gọi onClose để đóng hẳn modal
    setTimeout(onClose, 300); // 300ms phải khớp với thời gian transition của CSS
  };

  return (
    <div className={`modal-overlay ${isVisible ? 'is-visible' : 'is-hidden'}`}>
      <div className="modal-box">
        <h2 className="modal-title">Lưu ý trước khi sử dụng</h2>
        <div className="modal-content">
          <p>
            Chào mừng bạn đến với bản thử nghiệm tiktokvibes
            <br />
            Trước khi bắt đầu, hãy kiểm tra lại xem giao diện có dược như dưới ảnh ko. Nếu 2 viền bên trên và bên dưới của video nó bị tràn lên trên đỉnh và bên dưới (làm hỏng đi giao diện) thì hãy nhấn cho chế độ Zoom  " Ctrl - " hoặc " Ctrl + " sao cho giống ảnh bên dưới để ko bị hỏng giao diện.....
          </p>
          <img src="/images/MauAnh.png" alt="Hình ảnh lưu ý" className="welcome-image" />
        </div>
        <div className="modal-footer">
          <button onClick={handleClose}>Tôi đã hiểu</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;