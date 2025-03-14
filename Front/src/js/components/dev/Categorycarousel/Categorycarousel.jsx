import { useEffect, useState } from 'react';
import './Categorycarousel.css';
import servicioCategorias from '../../../services/categoriesService';
import Category from '../CategoryCarouselItem/CategoryItem';
import Loader from '../Loader/Loader';




export default function CategoryCarrousel() {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        servicioCategorias
            .getCategorias()
            .then(({ data }) => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error al obtener las categorias:', error);
            });
    }, []);
    return (
        <div className="flex justify-center items-center">
            <div className="carousel carousel-vertical rounded-box carousel-Category">
                {categories ? categories.map((category) => (
                    <div
                        key={category.id}
                        className="carousel-item carousel-item-Category cursor-pointer relative"
                    >

                        <Category
                            id_categoria={category.id}
                            title={category.name}
                            imageUrl={category.img_url}
                            description={category.description}
                        />
                    </div>
                )) : <Loader />}
            </div>
        </div>
    );
}