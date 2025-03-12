import { useState, useEffect } from 'react';

const images = import.meta.glob('/src/assets/carouselVertical/*.webp', { eager: true });

export default function useImageLoader(imageName) {
    const [loadedImage, setLoadedImage] = useState('');

    useEffect(() => {
        if (imageName) {
            const imageFileName = imageName.split('/').pop();

            const matchedImage = Object.entries(images).find(([path]) =>
                path.toLowerCase().includes(imageFileName.toLowerCase())
            );
            if (matchedImage) {
                setLoadedImage(matchedImage[1].default);
            } else {
                console.log('Imagen no encontrada para:', imageFileName);
            }
        }
    }, [imageName]);

    return loadedImage;
}


