import servicioCategorias from '../../../services/categoriesService';
import './PostDetails.css';
import { useState, useEffect } from 'react';
import useResize from '../../../bootstrap/hooks/useResize';
import useImageLoader from '../../../bootstrap/hooks/useImageLoader';
import { findNearestSpace } from '../../../bootstrap/utils/textUtils';
import Editor from '../Editor/Editor';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";

const PostDetails = ({ blog }) => {
    const { addError, addSuccess } = useAlert();

    const [imagenCategoria, setImagenCategoria] = useState();
    const [nombreCategoria, setNombreCategoria] = useState()
    // const isMobile = useResize();
    const loadedImage = useImageLoader(imagenCategoria);

    useEffect(() => {
        servicioCategorias
            .getOneCategoria(blog.id_categories)
            .then(({ data }) => {
                setImagenCategoria(data.img_url)
                setNombreCategoria(data.name)

            })
            .catch(error => {
                const data = JSON.parse(error.request.response);
                addError(data.error);
            });
    }, [blog.id_categories]);

    // const cutoffIndex = blog.content.length > 400 ? findNearestSpace(blog.content, isMobile ? 90 : 400) : null;
    // const primerosCaracteres = !cutoffIndex ? blog.content : blog.content.substring(0, cutoffIndex);
    // const resto = cutoffIndex ? blog.content.substring(cutoffIndex) : '';

    return (
        <div className="detallesBlog">
            <h3>{blog.title}</h3>
            <div className="tag">{nombreCategoria}</div>
            <div className="contenidoEntero">
                {/* <div className="blogContenido">{primerosCaracteres}</div> */}
                <div className="imagenBlog">
                    {loadedImage && <img src={loadedImage} alt={blog.title} />}
                </div>
                <Editor isEditable={false} post={blog} />
                {/* {resto ?? <div className="blogContenido2 blogContenido">{resto}</div>} */}
                <div className="autorNombre">{blog.autor}</div>
            </div>
        </div>
    );
}
export default PostDetails;
