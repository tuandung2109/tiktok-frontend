// import React, { useRef, useState } from 'react';
// import './CategoryBar/CategoryBar.scss';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Thêm bootstrap nếu chưa có

// const items = [
//     'All',
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

// export default function Explore() {
//     const barRef = useRef();
//     const [selected, setSelected] = useState('All');

//     const scroll = (dir) => {
//         barRef.current.scrollBy({
//             left: dir === 'left' ? -200 : 200,
//             behavior: 'smooth',
//         });
//     };

//     // Danh sách ảnh
//     const images = [
//         { src: '/images/Anh1.jpg', title: 'Ảnh 1' },
//         { src: '/images/Anh2.jpg', title: 'Ảnh 2' },
//         { src: '/images/Anh3.jpg', title: 'Ảnh 3' },
//         { src: '/images/avatar.png', title: 'Ảnh 4' },
//         { src: '/images/avatar.png', title: 'Ảnh 5' },
//         { src: '/images/avatar.png', title: 'Ảnh 6' },
//         { src: '/images/avatar.png', title: 'Ảnh 7' },
//         { src: '/images/avatar.png', title: 'Ảnh 8' },
//         { src: '/images/avatar.png', title: 'Ảnh 9' },
//         { src: '/images/avatar.png', title: 'Ảnh 10' },
//         { src: '/images/avatar.png', title: 'Ảnh 11' },
//         { src: '/images/avatar.png', title: 'Ảnh 12' },
//         { src: '/images/avatar.png', title: 'Ảnh 13' },
//         { src: '/images/avatar.png', title: 'Ảnh 14' },
//         { src: '/images/avatar.png', title: 'Ảnh 15' },
//         { src: '/images/avatar.png', title: 'Ảnh 16' },
//         { src: '/images/avatar.png', title: 'Ảnh 17' },
//         { src: '/images/avatar.png', title: 'Ảnh 18' },
//     ];


//     return (
//         <>
//             {/* CATEGORY BAR */}
//             <div className="bar-wrapper">
//                 <button className="arrow left" onClick={() => scroll('left')}>
//                     ❮
//                 </button>

//                 <div className="bar-scroll" ref={barRef}>
//                     {items.map((text, i) => (
//                         <div
//                             key={i}
//                             className={`item ${selected === text ? 'active' : ''}`}
//                             onClick={() => setSelected(text)}
//                         >
//                             {text}
//                         </div>
//                     ))}
//                 </div>

//                 <button className="arrow right" onClick={() => scroll('right')}>
//                     ❯
//                 </button>
//             </div>
//             <div className="container mt-3">
//                 {/* IMAGE LIST */}
//                 <div className="row mt-4">
//                     {images.map((img, i) => (
//                         <div className="col-md-4 mb-4" key={i}>
//                             <div className="card">
//                                 <img src={img.src} alt={img.title} width="100%" />
//                                 {/* <div className="card-body">
//                                     <h6 className="card-title">{img.title}</h6>
//                                 </div> */}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//                     </>
//     );
// }


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

    // Danh sách ảnh
    const images = [
        { src: '/images/Anh1.jpg', title: 'Ảnh 1' },
        { src: '/images/Anh2.jpg', title: 'Ảnh 2' },
        { src: '/images/Anh3.jpg', title: 'Ảnh 3' },
        { src: '/images/Anh4.jpg', title: 'Ảnh 4' },
        { src: '/images/Anh5.png', title: 'Ảnh 5' },
        { src: '/images/Anh6.jpg', title: 'Ảnh 6' },
        { src: '/images/Anh7.jpg', title: 'Ảnh 7' },
        { src: '/images/Anh8.jpg', title: 'Ảnh 8' },
        { src: '/images/Anh9.jpg', title: 'Ảnh 9' },
        { src: '/images/Anh10.jpg', title: 'Ảnh 10' },
        { src: '/images/Anh11.jpg', title: 'Ảnh 11' },
        { src: '/images/Anh12.jpg', title: 'Ảnh 12' },
        { src: '/images/Anh13.jpg', title: 'Ảnh 13' },
        { src: '/images/Anh14.jpg', title: 'Ảnh 14' },
        { src: '/images/Anh15.jpg', title: 'Ảnh 15' },
        { src: '/images/Anh16.jpg', title: 'Ảnh 16' },
        { src: '/images/Anh17.jpg', title: 'Ảnh 17' },
        { src: '/images/Anh18.jpg', title: 'Ảnh 18' },
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
                {/* IMAGE LIST */}
                <div className="row mt-4">
                    {images.map((img, i) => (
                        // Đã thêm col-6 và col-sm-6 để responsive tốt hơn
                        <div className="col-6 col-sm-6 col-md-4 mb-4" key={i}>
                            <div className="card image-card"> {/* Thêm class 'image-card' để dễ tùy chỉnh CSS */}
                                <img src={img.src} alt={img.title} />
                                {/* Phần card-body không cần thiết nếu chỉ hiển thị ảnh */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}