import React, { useRef } from 'react';
import './SendToModal.scss';

function SendToModal({ isOpen, onClose }) {
    const userListRef = useRef(null);    // ✅ Đưa lên trên
    const shareListRef = useRef(null);   // ✅ Đưa lên trên

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 100, behavior: 'smooth' });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied!');
    };

    if (!isOpen) return null;  // ✅ để sau useRef là đúng

    return (
        <div className="sendto-overlay" onClick={onClose}>
            <div className="sendto-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sendto-header">
                <h3 className="sendto-title">Send to</h3>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>


                <div className="sendto-section">
                    <p className="section-title">Recent</p>
                    <div className="sendto-carousel">
                        <button className="scroll-btn" onClick={() => scrollLeft(userListRef)}>&lt;</button>
                        <div className="user-list" ref={userListRef}>
                            {[1, 2, 3, 4, 5, 6, 7, 8,9,10].map((i) => (
                                <div key={i} className="user-avatar">
                                    <img src={`/images/avatar.png`} alt={`User ${i}`} />
                                    <span>User {i}</span>
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn" onClick={() => scrollRight(userListRef)}>&gt;</button>
                    </div>
                </div>

                <div className="sendto-section">
                    <p className="section-title">Share to</p>
                    <div className="sendto-carousel">
                        <button className="scroll-btn" onClick={() => scrollLeft(shareListRef)}>&lt;</button>
                        <div className="share-options" ref={shareListRef}>
                        
                        <div className="share-item" onClick={handleCopyLink}>
                            <div className="icon-circle">
                            <i className="fa-solid fa-link"></i>
                            </div>
                            <span>Copy link</span>
                        </div>

                        <div className="share-item">
                            <div className="icon-circle">
                            <i className="fa-brands fa-facebook-messenger"></i>
                            </div>
                            <span>Messenger</span>
                        </div>

                        <div className="share-item">
                            <div className="icon-circle">
                            <i className="fa-brands fa-facebook"></i>
                            </div>
                            <span>Facebook</span>
                        </div>

                        <div className="share-item">
                            <div className="icon-circle">
                            <i className="fa-brands fa-twitter"></i>
                            </div>
                            <span>Twitter</span>
                        </div>

                        <div className="share-item">
                            <div className="icon-circle">
                            <i className="fa-brands fa-whatsapp"></i>
                            </div>
                            <span>WhatsApp</span>
                        </div>

                        <div className="share-item">
                            <div className="icon-circle">
                            <i className="fa-brands fa-telegram"></i>
                            </div>
                            <span>Telegram</span>
                        </div>

                        <div className="share-item">
                            <div className="icon-circle">
                            <i className="fa-solid fa-envelope"></i>
                            </div>
                            <span>Email</span>
                        </div>
                        
                        </div>
                        <button className="scroll-btn" onClick={() => scrollRight(shareListRef)}>&gt;</button>
                    </div>
                    </div>
            </div>
        </div>
    );
}

export default SendToModal;

