import React, { useState, useEffect } from 'react';
import drug2 from './pictures/drug2.png'; // Import đường dẫn của hình ảnh
import './css/Carousel.css';

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const data = [
        {
            hiUser: 'Hello iAMMIA!',
            quote: '“Be careful about reading health books. You may die of a misprint.“',
            author: 'Mark Twain',
            imageUrl: drug2
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 500); // Chuyển đổi sau mỗi 0.5s

        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div className="main_two">
            <div className="two_theme">
                <div className="two_header">
                    <span className="two_hi_user">{data[activeIndex].hiUser}</span>
                    <p className="two_quote">{data[activeIndex].quote}</p>
                    <p className="two_author">{data[activeIndex].author}</p>
                </div>
            </div>
            <div className="two_img">
                <img src={data[activeIndex].imageUrl} alt="Carousel Image" />
            </div>
        </div>
    );
};

export default Carousel;
