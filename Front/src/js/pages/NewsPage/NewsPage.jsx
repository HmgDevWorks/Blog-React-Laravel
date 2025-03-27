import { useEffect, useState } from 'react';
import "./NewsPage.css";
import postService from '../../services/postService';
import Loader from '../../components/dev/Loader/Loader';
import PostDetails from '../../components/dev/PostDetails/PostDetails';
import { Link, redirect } from 'react-router-dom';
import { useAlert } from "../../bootstrap/contexts/AlertContext";
import { useTranslation } from 'react-i18next';

const NewsPage = () => {
  const { t } = useTranslation();
  const { addError, addSuccess } = useAlert();

  const [newsItems, setNewsItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para controlar el índice del slide actual

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

  // Función para cambiar el slide
  const handleNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
      redirect(`novedades#slide${currentSlide}`) // Navegar al siguiente slide
    } else if (direction === 'prev') {
      setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length); // Navegar al slide anterior
      redirect(`novedades#slide${currentSlide}`) // Navegar al siguiente slide 
    }
  };

  return (
    // <div className='mb-4 mt-4 novedades-page'>
<<<<<<< HEAD
    <><h1 className='novedades'>Novedades</h1>
=======
    <><h1 className='novedades'>{t("news.title")}</h1>
>>>>>>> main
      <div className="carousel w-full carousel-news mx-auto relative">
        {newsItems && newsItems.length > 0 ? (
          newsItems.map((item, index) => (


            <div
              key={item.id}
              id={`slide${item.id}`}
              className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <Link key={item.id} to={`/detallesBlog/${item.id}`}>
                <PostDetails className="w-full" blog={item} />
              </Link>
            </div>

          ))
        ) : (
          <Loader />
        )}

        {/* Navigation buttons */}
        <div className="botones-novedades absolute top-1/2 flex -translate-y-1/2 justify-between px-3">
          <button onClick={() => handleNavigation('prev')} className="btn btn-circle">❮</button>
          <button onClick={() => handleNavigation('next')} className="btn btn-circle">❯</button>
        </div>
      </div>
    </>
    // </div>
  );
};

export default NewsPage;
