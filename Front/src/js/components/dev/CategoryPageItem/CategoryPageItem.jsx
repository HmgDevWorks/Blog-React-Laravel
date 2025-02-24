import React from 'react';
import './CategoryPageItem.css';

const enlacesDePrueba = [
    { id: 1, title: 'Enlace 1', url: '/enlace1' },
    { id: 2, title: 'Enlace 2', url: '/enlace2' },
    { id: 3, title: 'Enlace 3', url: '/enlace3' },
    { id: 4, title: 'Enlace 4', url: '/enlace4' },
    { id: 5, title: 'Enlace 5', url: '/enlace5' },
    { id: 6, title: 'Enlace 6', url: '/enlace6' },
    { id: 7, title: 'Enlace 7', url: '/enlace7' },
    { id: 8, title: 'Enlace 8', url: '/enlace8' },
    { id: 9, title: 'Enlace 9', url: '/enlace9' },
    { id: 10, title: 'Enlace 10', url: '/enlace10' },
];

function Category() {
    return (
        <div>
            <div className="indiceCategorias text-center p-2">
                Indice
            </div>
            <ul className="enlaces-lista">
                {enlacesDePrueba.map((enlace) => (
                    <li key={enlace.id} className="enlace-item">
                        <a href={enlace.url} className="enlace">
                            {enlace.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;