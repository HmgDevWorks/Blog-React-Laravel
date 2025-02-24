import React, { useEffect, useState } from 'react';
import NewsCarousel from "../../components/dev/Newscarousel/NewsCarousel";
import "./FavPage.css";
import axios from 'axios';

const FavPage = () => {
  const [newsItems, setNewsItems] = useState([]);
// useEffect(() => {
//     const fetchNewsItems = async () => {
//         try {
//             const response = await axios.get('/api/posts/favorites');
//             setNewsItems(response.data);
//         } catch (error) {
//             console.error('Error fetching news items:', error);
//         }
//     };

//     fetchNewsItems();
// }, []);

  useEffect(() => {
      
      const viewNewsItems = [
          {
            title: 'Noticia 1',
            tags: ['tag1', 'tag2'],
            // img: 'https://via.placeholder.com/800x400?text=Noticia+1',
            bodyText: 'Texto de la noticia 1',
            author: 'Autor 1'
          },
          {
            title: 'Noticia 2',
            tags: ['tag1', 'tag2'],
            // img: 'https://via.placeholder.com/800x400?text=Noticia+1',
            bodyText: 'Texto de la noticia 1',
            author: 'Autor 1'
          },
          {
            title: 'Noticia 3',
            tags: ['tag1', 'tag2'],
            // img: 'https://via.placeholder.com/800x400?text=Noticia+1',
            bodyText: 'Texto de la noticia 1',
            author: 'Autor 1'
          }
      ];
      setNewsItems(viewNewsItems);
  }, []);

  return (
      <div className='favourites-page'>
          <h1 className='favourites'>Favoritos:</h1>
          <NewsCarousel className="carousel-news" newsItems={newsItems} />
      </div>
  );
};
export default FavPage;