import React from 'react';
import './CategoryItem.css';

export default function Category({ title, imageUrl, description }) {
    return (
        <div className="relative category-Carrousel-container">
            <a href={`/categorias/${title}`}>
                <img
                    src={imageUrl}
                    alt={title}
                    className="grayscale w-full"
                />
            </a>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-custom-color text-center p-2">
                <h2>{title}</h2>
                <p className="description-text">{description}</p>
            </div>
        </div>
    );
}
