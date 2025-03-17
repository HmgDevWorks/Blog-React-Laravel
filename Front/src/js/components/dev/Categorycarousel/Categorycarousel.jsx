import { useEffect, useState } from 'react';
import './Categorycarousel.css';
import servicioCategorias from '../../../services/categoriesService';
import Category from '../CategoryCarouselItem/CategoryItem';
import Loader from '../Loader/Loader';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";




export default function CategoryCarrousel() {
    const { addError, addSuccess } = useAlert();

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        servicioCategorias
            .getCategorias()
            .then(({ data }) => {
                setCategories(data);
            })
            .catch(error => {
                const data = JSON.parse(error.request.response);
                addError(data.error);
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