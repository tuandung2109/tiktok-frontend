import React, { useRef, useEffect, useState } from 'react';
import './SendToModal.scss';

function SendToModal({ isOpen, onClose }) {
    const [show, setShow] = useState(false);
    const userListRef = useRef(null);
    const shareListRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 180); // giảm từ 300 xuống 180
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

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

    const fakeAvatars = [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/65.jpg",
        "https://randomuser.me/api/portraits/women/68.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg",
        "https://randomuser.me/api/portraits/women/21.jpg",
        "https://randomuser.me/api/portraits/men/77.jpg",
        "https://randomuser.me/api/portraits/women/82.jpg",
        "https://randomuser.me/api/portraits/men/90.jpg",
        "https://randomuser.me/api/portraits/women/99.jpg"
    ];

    if (!isOpen && !show) return null;

    return (
        <div className={`sendto-overlay ${isOpen ? 'open' : 'close'}`} onClick={onClose}>
            <div className={`sendto-modal ${isOpen ? 'open' : 'close'}`} onClick={e => e.stopPropagation()}>
            <div className="sendto-header">
                <h3 className="sendto-title">Send to</h3>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>


                <div className="sendto-section">
                    <p className="section-title">Recent</p>
                    <div className="sendto-carousel">
                        <button className="scroll-btn" onClick={() => scrollLeft(userListRef)}>&lt;</button>
                        <div className="user-list" ref={userListRef}>
                            {fakeAvatars.map((url, i) => (
                                <div key={i} className="user-avatar">
                                    <img src={url} alt={`User ${i + 1}`} />
                                    <span>User {i + 1}</span>
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
                            <span>Copy</span>
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

