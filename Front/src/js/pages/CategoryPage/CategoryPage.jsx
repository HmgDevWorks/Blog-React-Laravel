import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CreatePost from "../../components/dev/CreatePost/CreatePost";
import BackToTop from "../../components/dev/backToTop/BackToTop";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import PostDetails from "../../components/dev/PostDetails/PostDetails";
import './CategoryPage.css';
import postService from '../../services/postService';

const CategoryPage = () => {
  const location = useLocation();
  const id_categorie = location.state?.id_categorie;

  const {title} = useParams();
  console.log(  id_categorie
);
  const [numArticulos, setNumArticulos] = useState(0);
  const [articulos, setArticulos] = useState([]);

    useEffect(() => {
      postService.getCategoryPosts(id_categorie)
        .then(({ data }) => {
          console.log(data);
          setArticulos(data);
          setNumArticulos(data.length); // Set the number of articles based on the data length
        });
    }, []);
  return (
    <div>
      <div className="Titulo_Sin_Fondo text-center p-2">
        
        {title}
        {id_categorie}
      </div>
      <div className="numArticulos">
        <p>{numArticulos} artículos</p>
      </div>
      <ArticleFinder />
      <div className="indiceCategorias text-center p-2">
        Indice
      </div>
      <div>
        <ul className="enlaces-lista">
          {articulos.map((articulo) => (
            <li key={articulo.id} className="enlace-item">
              <a href={`/postDetails/${articulo.id}`}>
                <PostDetails blog={articulo} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default CategoryPage;
