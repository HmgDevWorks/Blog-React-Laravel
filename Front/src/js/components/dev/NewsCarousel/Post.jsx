import { useState, useEffect } from "react";
import useImageLoader from "../../../bootstrap/hooks/useImageLoader";

export default function Post({ item, index, totalItems }) {

    const [imagenCategoria, setImagenCategoria] = useState();
    const loadedImage = useImageLoader(imagenCategoria);

    // Use useEffect to set the image URL only once when the component mounts
    useEffect(() => {
        if (item.img_url) {
            setImagenCategoria(item.img_url);

        }
    }, [item.img_url]); // Dependency array ensures this runs only when item.img_url changes
    console.log(item)
    return (
        <div key={index} id={`slide${index + 1}`} className="carousel-item-news relative w-full h-full hidden">
            {loadedImage && <img src={loadedImage} alt={item.title} className="w-full text-center" />}
            <div className="absolute left-10 right-10 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${(index - 1 + totalItems) % totalItems + 1}`} className="btn btn-circle buttonDirection-news">❮</a>
                <a href={`#slide${(index + 1) % totalItems + 1}`} className="btn btn-circle buttonDirection-news">❯</a>
            </div>
            <div className="bottom-5 left-5 w-full">
                <h2 className="item-title-news w-full">{item.title}</h2>
                <p className="item-text-news w-full">{item.content}</p>
                <p className="item-status-news w-full">Status: {item.status}</p>
                <p className="item-dates-news w-full">
                    Created At: {new Date(item.created_at).toLocaleDateString()} <br />
                    Updated At: {new Date(item.updated_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
