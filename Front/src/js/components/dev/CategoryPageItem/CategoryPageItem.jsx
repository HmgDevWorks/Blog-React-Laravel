import { useEffect, useState } from 'react';
import './CategoryPageItem.css';

const images = import.meta.glob('../../../../assets/carouselVertical/*.webp', { eager: true });

export default function Category({ title, imageUrl, description }) {
    const [loadedImage, setLoadedImage] = useState(null);

    useEffect(() => {
        // Buscar la imagen que coincide con la ruta
        const matchedImage = Object.entries(images).find(([path]) => path.includes(imageUrl));
        if (matchedImage) {
            setLoadedImage(matchedImage[1].default);
        }
    }, [imageUrl]);
    return (
        <div className="relative category-Carrousel-container">
            <a href={`#${title}`}>
                <img
                    src={loadedImage}
                    alt={title}
                    className="grayscale w-full"
                />
            </a>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-custom-color text-center p-2">
                {title}
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