import { useEffect, useState } from 'react';
import './Categorycarousel.css';
import Category from '../CategoryCarouselItem/CategoryItem';
import Ciencia from '../../../../assets/categorias/Ciencia.webp';
import Cultura from '../../../../assets/categorias/Cultura.webp';
import Deportes from '../../../../assets/categorias/Deportes.webp';
import economia from '../../../../assets/categorias/economia.webp';
import Entretenimiento from '../../../../assets/categorias/Entretenimiento.webp';
import Estetica from '../../../../assets/categorias/Estetica.webp';
import Recetas from '../../../../assets/categorias/Recetas.webp';
import salud from '../../../../assets/categorias/salud.webp';
import Tecnologia from '../../../../assets/categorias/Tecnologia.webp';
import Viajes from '../../../../assets/categorias/Viajes.webp';

const provisionalCategories = [
    { id: 1, title: 'Tecnologia', image: Tecnologia , description: 'Noticias de tecnologia' },
    { id: 2, title: 'Salud', image: salud, description: 'Noticias de salud' },
    { id: 3, title: 'Ciencia', image: Ciencia, description: 'Noticias de ciencia' },
    { id: 4, title: 'Viajes', image: Viajes, description: 'Noticias de viajes' },
    { id: 5, title: 'Cultura', image: Cultura, description: 'Noticias de cultura' },
    { id: 6, title: 'Deportes', image: Deportes, description: 'Noticias de deportes' },
    { id: 7, title: 'Entretenimiento', image: Entretenimiento, description: 'Noticias de entretenimiento' },
    { id: 8, title: 'Recetas', image: Recetas, description: 'Noticias de recetas' },
    { id: 9, title: 'Estetica', image: Estetica, description: 'Noticias de estetica' },
    { id: 10, title: 'Economia', image: economia, description: 'Noticias de economia' },
];

export default function CategoryCarrousel() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(provisionalCategories);
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="carousel carousel-vertical rounded-box carousel-Category">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="carousel-item carousel-item-Category cursor-pointer relative"
                    >
                        <Category
                            title={category.title}
                            imageUrl={category.image} // Ajusta la ruta según tu estructura de carpetas
                            description={category.description} // Añade la descripción
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}