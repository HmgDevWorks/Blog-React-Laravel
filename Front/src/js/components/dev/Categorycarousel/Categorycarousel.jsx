import { useState } from 'react';
import './Categorycarousel.css';
import servicioCategorias from '../../../services/categoriesService';
import Category from '../CategoryCarouselItem/CategoryItem';
import Loader from '../Loader/Loader';




export default function CategoryCarrousel() {
    const [categories, setCategories] = useState([]);

    servicioCategorias.
        getCategorias()
        .then(({ data }) => {
            setCategories(data)
        })
        .catch(err => console.log(err))

    return (
        <div className="flex justify-center items-center">
            <div className="carousel carousel-vertical rounded-box carousel-Category">
                {categories ? categories.map((category) => (
                    <div
                        key={category.id}
                        className="carousel-item carousel-item-Category cursor-pointer relative"
                    >

                        <Category
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