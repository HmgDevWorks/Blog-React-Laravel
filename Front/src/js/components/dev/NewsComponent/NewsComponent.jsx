import { useEffect, useState } from 'react';
import "./NewsComponent.css";
import postService from '../../../services/postService';
import Loader from '../Loader/Loader';
import PostDetails from '../PostDetails/PostDetails';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { memo } from 'react';

const NewsComponent = () => {
  const { t } = useTranslation();
  const { addError, addSuccess } = useAlert();
  const { loggedUser } = useContext(AuthContext);
  const [newsItems, setNewsItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    loadNewPost();
  }, []);

  const loadNewPost = () => {
    postService
      .getLastTenPost()
      .then(({ data }) => {
        setNewsItems(data);
      })
      .catch(error => {
        const data = JSON.parse(error.request.response);
        addError(data.error);
      });
  };

  // Función para eliminar un post y actualizar la lista
  const handleDeletePost = () => {
    loadNewPost()
  };

  const handleNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    } else if (direction === 'prev') {
      setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    }
  };

  return (
    <>
      <h1 className='novedades'>{t("news.title")}</h1>
      <div className={`carousel w-full carousel-news mx-auto relative `}>
        {newsItems && newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <div
              key={item.id}
              id={`slide${item.id}`}
              className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <div className="pb-4">
                <PostDetails
                  className="w-full"
                  blog={item}
                  onDelete={handleDeletePost}  // Pasamos la función de actualización
                />
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}

        {/* Navigation buttons */}

      </div>
      <div className="botones-novedades absolute top-1/2 flex -translate-y-1/2 justify-between px-3">
        <button onClick={() => handleNavigation('prev')} className="btn btn-circle">❮</button>
        <button onClick={() => handleNavigation('next')} className="btn btn-circle">❯</button>
      </div>
    </>
  );
};

export default memo(NewsComponent);
