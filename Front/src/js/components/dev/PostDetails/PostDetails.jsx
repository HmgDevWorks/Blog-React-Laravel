import './PostDetails.css';
import Editor from '../Editor/Editor';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";
import { Link, useLocation } from 'react-router-dom';

const PostDetails = ({ blog }) => {
    const { addError, addSuccess } = useAlert();

    const location = useLocation();
    const postUrl = `/postDetails/${blog.id}`;

    return (
        <div className="detallesBlog">
            <h3>{blog.title}</h3>
            <div className="tag">{blog.category_name}</div>
            <div className="contenidoEntero">
                {/* <div className="blogContenido">{primerosCaracteres}</div> */}
                {/* // TODO Check if image will be used
                 */}
                {/* <div className="imagenBlog">
                    {loadedImage && <img src={loadedImage} alt={blog.title} />}
                </div> */}
                {location.pathname !== postUrl ? (
                    <Link to={postUrl}>
                        <Editor isEditable={false} post={blog} />
                    </Link>
                ) : (
                    <Editor isEditable={false} post={blog} />
                )}
                {/* {resto ?? <div className="blogContenido2 blogContenido">{resto}</div>} */}
                <div className="autorNombre">{blog.autor}</div>
            </div>

        </div>
    );
}
export default PostDetails;
