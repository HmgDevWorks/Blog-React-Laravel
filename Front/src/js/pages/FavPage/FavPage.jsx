import React, { useEffect, useState } from 'react';
import NewsCarousel from "../../components/dev/NewsCarousel/NewsCarousel";
import "./FavPage.css";
import favService from '../../services/favService';
import PostTable from '../../components/dev/PostsTable/PostTable';
import { useAlert } from '../../bootstrap/contexts/AlertContext';

const FavPage = () => {
  const { addError, addSuccess } = useAlert();
  const [favPosts, setFavPosts] = useState([]);

  useEffect(() => {
    favService.getUserFavs()
      .then(response => {
        console.log(response);
        setFavPosts(response.data);
      }).catch(error => {
        addError(error.mensaje);
        console.log(error);
      });
  }, []);

  return (
    <div className='favourites-page'>
      <h1 className='favourites'>Favoritos:</h1>
      {/* <NewsCarousel className="carousel-news" newsItems={newsItems} /> */}
      {favPosts && <PostTable posts={favPosts} />}
    </div>
  );
};
export default FavPage;