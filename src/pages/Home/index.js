import React from 'react';
import './Home.scss';

function Home() {
    return (
        <div className="video-container">
            <video
                className="video-player"
                src="/videos/video1.mp4"
                controls
                autoPlay
                loop
            ></video>
        </div>
    );
}

export default Home;
