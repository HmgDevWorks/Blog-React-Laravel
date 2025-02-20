import React from 'react';
export default function Post  ({ item, index, totalItems })  {
    return (
        <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full h-full hidden">
            
            {item.img && <img src={item.img} alt={item.title} className="w-full text-center" />}

            <div className="absolute left-10 right-10 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${(index - 1 + totalItems) % totalItems + 1}`} className="btn btn-circle buttonDirection">❮</a>
                <a href={`#slide${(index + 1) % totalItems + 1}`} className="btn btn-circle buttonDirection">❯</a>
            </div>
            <div className="bottom-5 left-5 w-full">
                <h2 className='item-title w-full'>{item.title}</h2>
                <p className='item-text w-full'>{item.bodyText}</p>
                {item.tags.length > 0 && <p className='item-tag w-full'>{item.tags.join(', ')}</p>}
                <p className="item-author w-full"><small>{item.author}</small></p>
            </div>
        </div>
    );
};