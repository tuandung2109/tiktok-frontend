import React, { useEffect, useRef } from 'react';

function TikTokEmbed({ embedHtml }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        containerRef.current.appendChild(script);
    }, []);

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: embedHtml }} />
    );
}

export default TikTokEmbed;
