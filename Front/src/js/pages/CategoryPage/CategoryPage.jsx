import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import CreatePost from "../../components/dev/CreatePost/CreatePost";
import BackToTop from "../../components/dev/backToTop/BackToTop";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import PostDetails from "../../components/dev/PostDetails/PostDetails";
import './CategoryPage.css';
import categoriesService from '../../services/categoriesService';

const CategoryPage = () => {
  const location = useLocation();
  //     const id_categorie = location.state?.id_categorie;
  const title = location.state?.title;

  //     const { title } = useParams();
  console.log(title);
  const [numArticulos, setNumArticulos] = useState(0);
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    if (title) {
      categoriesService.gerPostForCategory(title)
        .then(({ data }) => {
          console.log(data);
          const posts = data.Post; // Accede a la propiedad Post
          if (Array.isArray(posts)) {
            setArticulos(posts);
            setNumArticulos(posts.length); // Set the number of articles based on the data length
          } else {
            console.error('La respuesta de la API no es un array:', posts);
          }
        })
        .catch(error => {
          console.error('Error al obtener los artículos de la categoría:', error);
        });
    } else {
      console.error('title es undefined');
    }
  }, [title]);
  console.log(articulos);
  return (
    <div>
      <div className="Titulo_Sin_Fondo text-center p-2">
        {title}
        {/*                 {id_categorie} */}
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
              <Link to={`/postDetails/${articulo.id}`}>
                <PostDetails blog={articulo} />
              </Link>
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
