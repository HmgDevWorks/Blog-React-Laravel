import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import DetallesBlog from "../../components/dev/DetallesBlog/DetallesBlog";
import './CategoryPage.css';

const CategoryPage = () => {
  const { id_categoria } = useParams();
  const [numArticulos, setNumArticulos] = useState(0);
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    // Datos hardcodeados
    const data = {
      numArticulos: 10,
      articulos: [
        { id: 1, titulo: 'Javascript', content: 'orem ipsum dolor, sit amet consectetur adipisicing elit. Iure rerum tempore quod aliquam nostrum repudiandae, vero, autem nisi, alias placeat suscipit. Aliquam non a et deserunt debitis molestiae vel autem?', autor: 'Pedro', tag: 'Tag 1', image: 'https://via.placeholder.com/150' },
        { id: 2, titulo: 'Php', content: 'Contenido del artículo PHP', autor: 'Paco', tag: 'Tag 2', image: 'https://via.placeholder.com/150' },
        { id: 3, titulo: 'Java', content: 'Contenido del artículo Java', autor: 'Dolores', tag: 'Tag 3', image: 'https://via.placeholder.com/150' },
        { id: 4, titulo: 'React', content: 'Contenido del artículo React', autor: 'Sabaton', tag: 'Tag 4', image: 'https://via.placeholder.com/150' },
        { id: 5, titulo: 'Laravel', content: 'Contenido del artículo Laravel', autor: 'Autor 5', tag: 'Tag 5', image: 'https://via.placeholder.com/150' },
        { id: 6, titulo: 'aaaaaa', content: 'Contenido del artículo aaaaaa', autor: 'Autor 6', tag: 'Tag 6', image: 'https://via.placeholder.com/150' },
        { id: 7, titulo: 'WIIIIII', content: 'Contenido del artículo WIIIIII', autor: 'Autor 7', tag: 'Tag 7', image: 'https://via.placeholder.com/150' },
        { id: 8, titulo: 'Artículo 8', content: 'Contenido del artículo 8', autor: 'Autor 8', tag: 'Tag 8', image: 'https://via.placeholder.com/150' },
        { id: 9, titulo: 'Artículo 9', content: 'Contenido del artículo 9', autor: 'Autor 9', tag: 'Tag 9', image: 'https://via.placeholder.com/150' },
        { id: 10, titulo: 'Artículo 10', content: 'Contenido del artículo 10', autor: 'Autor 10', tag: 'Tag 10', image: 'https://via.placeholder.com/150' },
      ],
    };

    setNumArticulos(data.numArticulos);
    setArticulos(data.articulos);
  }, [id_categoria]);

  return (
    <div>
      <div className="Titulo_Sin_Fondo text-center p-2">
        {id_categoria}
      </div>
      <div className="numArticulos">
        <p>{numArticulos} artículos</p>
      </div>
      <ArticleFinder />
      <div className="indiceCategorias text-center p-2">
        Indice
      </div>
      <ul className="enlaces-lista">
        {articulos.map((articulo) => (
          <li key={articulo.id} className="enlace-item">
            <a href={`/detallesBlog/${articulo.id}`}>
              <DetallesBlog blog={articulo} />
            </a>
          </li>
        ))}
      </ul>
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default CategoryPage;
