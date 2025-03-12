import servicioCategorias from '../../../services/categoriesService';
import './DetallesBlog.css';
import { useState, useEffect } from 'react';
import useResize from '../../../bootstrap/hooks/useResize';
import useImageLoader from '../../../bootstrap/hooks/useImageLoader';
import { findNearestSpace } from '../../../bootstrap/utils/textUtils';
import Editor from '../editor/Editor';

const DetallesBlog = ({ blog }) => {

    const [imagenCategoria, setImagenCategoria] = useState();
    const [nombreCategoria, setNombreCategoria] = useState()
    const isMobile = useResize();
    const loadedImage = useImageLoader(imagenCategoria);

    useEffect(() => {
        servicioCategorias
            .getOneCategoria(blog.id_categories)
            .then(({ data }) => {
                setImagenCategoria(data.img_url)
                setNombreCategoria(data.name)

            })
            .catch((err) => console.log(err));
    }, [blog.id_categories]);

    // const cutoffIndex = blog.content.length > 400 ? findNearestSpace(blog.content, isMobile ? 90 : 400) : null;
    // const primerosCaracteres = !cutoffIndex ? blog.content : blog.content.substring(0, cutoffIndex);
    // const resto = cutoffIndex ? blog.content.substring(cutoffIndex) : '';

    return (
        <div className="detallesBlog">
            <h3>{blog.title}</h3>
            <div className="tag">{nombreCategoria}</div>
            <div className="contenidoEntero">
                {/* <div className="blogContImg">
                    <div className="blogContenido">{primerosCaracteres}</div>
                    <div className="imagenBlog">
                        {loadedImage && <img src={loadedImage} alt={blog.title} />}
                    </div>
                </div> */}
                <Editor isEditable={false} post={blog} />
                {/* {resto ?? <div className="blogContenido2 blogContenido">{resto}</div>} */}
                <div className="autorNombre">{blog.autor}</div>
            </div>
        </div>
    );
}
export default DetallesBlog;
