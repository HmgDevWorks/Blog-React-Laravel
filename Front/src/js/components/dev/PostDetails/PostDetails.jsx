import './PostDetails.css';
import Editor from '../Editor/Editor';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import postService from '../../../services/postService';
import FavToggle from '../FavToggle/FavToggle';

const PostDetails = ({ blog, onDelete }) => {
    const { addError, addSuccess } = useAlert();
    const { loggedUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    const postUrl = `/postDetails/${blog.id}`;
    const isOnPostDetails = location.pathname === postUrl;

    const handleDelete = () => {
        postService.deletePost(blog.id)
            .then(() => {
                addSuccess(t("Post eliminado con éxito"));
                setShowModal(false);
                if (isOnPostDetails) {
                    navigate('/');
                }
                // Llamamos a la función onDelete pasada como prop
                if (onDelete) onDelete();
            })
            .catch((error) => {
                console.error(error);
                addError(t("Error al eliminar el post"));
            });
    };

    return (
        <div className="detallesBlog">
            <h3>{blog.title}</h3>
            <div className="tag">{blog.category_name}</div>
            <div className="contenidoEntero">
                {location.pathname !== postUrl ? (
                    <Link to={postUrl}>
                        <Editor isEditable={false} post={blog} />
                    </Link>
                ) : (
                    <Editor isEditable={false} post={blog} />
                )}

                <div className="flex justify-around mt-4">
                    {(loggedUser?.role === 'admin' || loggedUser?.id === blog.user_id) && (
                        <>
                            <button
                                className="btn btn-soft btn-secondary mt-4"
                                onClick={() => setShowModal(true)}
                            >
                                {t("PostDetails.Delete")}
                            </button>

                            {/* Modal DaisyUI */}
                            {showModal && (
                                <div className="modal modal-open">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">¿Seguro que quieres borrar este post?</h3>
                                        <div className="modal-action flex justify-between">
                                            <button className="btn btn-error" onClick={handleDelete}>
                                                Confirmar
                                            </button>
                                            <button className="btn" onClick={() => setShowModal(false)}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className="autorNombre mt-4">{blog.author_name}</div></div>
            </div>
            {loggedUser && <FavToggle fav={blog.isFav} id={blog.id} />}
        </div>
    );
};

export default PostDetails;
