import { useEffect, useState } from 'react';
import './CategoryItem.css';
import { Link } from 'react-router-dom';

const images = import.meta.glob('../../../../assets/carouselVertical/*.webp', { eager: true });

export default function Category({ id_categoria ,title, imageUrl, description }) {
    const [loadedImage, setLoadedImage] = useState(null);
console.log(id_categoria)
    useEffect(() => {

        const matchedImage = Object.entries(images).find(([path]) => path.includes(imageUrl));
        if (matchedImage) {
            setLoadedImage(matchedImage[1].default);
        }
    }, [imageUrl]);

    return (
        <div className="relative category-Carrousel-container">
            <Link to={`/categorias/${title}`} state={{id_categoria}}>              
            <img
                    src={loadedImage}
                    alt={title}
                    className="grayscale w-full"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-custom-color text-center p-2">
                    {title}
                </div>
            </Link>
        </div>
    );
}
