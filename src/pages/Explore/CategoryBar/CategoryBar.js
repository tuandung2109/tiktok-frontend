// import React, { useRef } from 'react';
// import './CategoryBar.scss';

// const items = [
//     'Anime',
//     'Love',
//     'Shows',
//     'Lipsync',
//     'Life',
//     'Beauty',
//     'Games',
//     'News',
//     'Style',
//     'Cars',
//     'Food',
//     'Pets',
//     'Family',
//     'Drama',
//     'Health',
// ];

// export default function CategoryBar() {
//     const barRef = useRef();

//     const scroll = (dir) => {
//         barRef.current.scrollBy({
//             left: dir === 'left' ? -200 : 200,
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <div className="bar-wrapper">
//             <button className="arrow left" onClick={() => scroll('left')}>
//                 ❮
//             </button>

//             <div className="bar-scroll" ref={barRef}>
//                 {items.map((text, i) => (
//                     <div key={i} className={`item ${text === 'Shows' ? 'active' : ''}`}>
//                         {text}
//                     </div>
//                 ))}
//             </div>

//             <button className="arrow right" onClick={() => scroll('right')}>
//                 ❯
//             </button>
//         </div>
//     );
// }
