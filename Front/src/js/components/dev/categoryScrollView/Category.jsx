import React from 'react';
import './Category.css';

export default function Category({ title, imageUrl }) {
    return (
        <div className='category' style={{ backgroundImage: `url(${imageUrl})` }}>
            {title}
        </div>
    );
};
