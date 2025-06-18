import React, { useRef, useState } from 'react';
import './CategoryBar/CategoryBar.scss';
import 'bootstrap/dist/css/bootstrap.min.css'; // Thêm bootstrap nếu chưa có

const items = [
    'All',
    'Anime',
    'Love',
    'Shows',
    'Lipsync',
    'Life',
    'Beauty',
    'Games',
    'News',
    'Style',
    'Cars',
    'Food',
    'Pets',
    'Family',
    'Drama',
    'Health',
];

export default function Explore() {
    const barRef = useRef();
    const [selected, setSelected] = useState('All');

    const scroll = (dir) => {
        barRef.current.scrollBy({
            left: dir === 'left' ? -200 : 200,
            behavior: 'smooth',
        });
    };

    // Danh sách video
    const videos = [
        { src: '/videos/video1.mp4', title: 'Video 1' },
        { src: '/videos/video2.mp4', title: 'Video 2' },
        { src: '/videos/video1.mp4', title: 'Video 3' },
        { src: '/videos/video2.mp4', title: 'Video 4' },
        { src: '/videos/video1.mp4', title: 'Video 5' },
        { src: '/videos/video2.mp4', title: 'Video 6' },
        { src: '/videos/video1.mp4', title: 'Video 7' },
        { src: '/videos/video2.mp4', title: 'Video 8' },
        { src: '/videos/video1.mp4', title: 'Video 9' },
        { src: '/videos/video2.mp4', title: 'Video 10' },
        { src: '/videos/video1.mp4', title: 'Video 11' },
        { src: '/videos/video2.mp4', title: 'Video 12' },
        { src: '/videos/video1.mp4', title: 'Video 13' },
        { src: '/videos/video2.mp4', title: 'Video 14' },
        { src: '/videos/video1.mp4', title: 'Video 15' },
        { src: '/videos/video2.mp4', title: 'Video 16' },
        { src: '/videos/video1.mp4', title: 'Video 17' },
        { src: '/videos/video2.mp4', title: 'Video 18' },
    ];

    return (
        <>
            {/* CATEGORY BAR */}
            <div className="bar-wrapper">
                <button className="arrow left" onClick={() => scroll('left')}>
                    ❮
                </button>

                <div className="bar-scroll" ref={barRef}>
                    {items.map((text, i) => (
                        <div
                            key={i}
                            className={`item ${selected === text ? 'active' : ''}`}
                            onClick={() => setSelected(text)}
                        >
                            {text}
                        </div>
                    ))}
                </div>

                <button className="arrow right" onClick={() => scroll('right')}>
                    ❯
                </button>
            </div>
            <div className="container mt-3">
                {/* VIDEO LIST */}
                <div className="row mt-4">
                    {videos.map((video, i) => (
                        <div className="col-md-4 mb-4" key={i}>
                            <div className="card">
                                <video controls width="100%">
                                    <source src={video.src} type="video/mp4" />
                                    Trình duyệt không hỗ trợ video.
                                </video>
                                {/* <div className="card-body">
                                    <h6 className="card-title">{video.title}</h6>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
