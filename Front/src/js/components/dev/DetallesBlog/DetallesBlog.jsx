import './DetallesBlog.css'
import { useState, useEffect } from 'react';



const DetallesBlog = ({ blog }) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const findNearestSpace = (text, index) => {
        if (text[index] === ' ') return index;
        let left = index - 1;
        let right = index + 1;
        while (left >= 0 || right < text.length) {
            if (left >= 0 && text[left] === ' ') return left;
            if (right < text.length && text[right] === ' ') return right;
            left--;
            right++;
        }
        return index;
    };

    let PrimerosCaracteresIndex = findNearestSpace(blog.contenido, 400);
    let restoIndex = findNearestSpace(blog.contenido, 400);

    if (isMobile) {
        PrimerosCaracteresIndex = findNearestSpace(blog.contenido, 90);
        restoIndex = findNearestSpace(blog.contenido, 90);
    }


    let PrimerosCaracteres = blog.contenido.substring(0, PrimerosCaracteresIndex);
    let resto = blog.contenido.substring(restoIndex, blog.contenido.length);
    return (
        <div className="detallesBlog">
            <h3>{blog.titulo}</h3>
            <div className="tag">{blog.tag}</div>
            <div className="contenidoEntero">
                <div className="blogContImg">
                    <div className="blogContenido">
                        {PrimerosCaracteres}
                    </div>
                    <div className="imagenBlog">
                        <img src={blog.image} alt="" />
                    </div>
                </div>
                <div className="blogContenido2 blogContenido">
                    {resto}
                </div>
                <div className="autorNombre">
                    {blog.autor}
                </div>
            </div>
        </div>
    );
}
export default DetallesBlog;