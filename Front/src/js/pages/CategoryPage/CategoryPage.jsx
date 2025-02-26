import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import DetallesBlog from "../DetallesBlogPage/DetallesBlogPage";
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
        { id: 1, titulo: 'Javascript', contenido: 'Contenido del artículo Javascript', autor: 'Pedro', tag: 'Tag 1', image: 'https://via.placeholder.com/150' },
        { id: 2, titulo: 'Php', contenido: 'Contenido del artículo PHP', autor: 'Paco', tag: 'Tag 2', image: 'https://via.placeholder.com/150' },
        { id: 3, titulo: 'Java', contenido: 'Contenido del artículo Java', autor: 'Dolores', tag: 'Tag 3', image: 'https://via.placeholder.com/150' },
        { id: 4, titulo: 'React', contenido: 'Contenido del artículo React', autor: 'Sabaton', tag: 'Tag 4', image: 'https://via.placeholder.com/150' },
        { id: 5, titulo: 'Laravel', contenido: 'Contenido del artículo Laravel', autor: 'Autor 5', tag: 'Tag 5', image: 'https://via.placeholder.com/150' },
        { id: 6, titulo: 'aaaaaa', contenido: 'Contenido del artículo aaaaaa', autor: 'Autor 6', tag: 'Tag 6', image: 'https://via.placeholder.com/150' },
        { id: 7, titulo: 'WIIIIII', contenido: 'Contenido del artículo WIIIIII', autor: 'Autor 7', tag: 'Tag 7', image: 'https://via.placeholder.com/150' },
        { id: 8, titulo: 'Artículo 8', contenido: 'Contenido del artículo 8', autor: 'Autor 8', tag: 'Tag 8', image: 'https://via.placeholder.com/150' },
        { id: 9, titulo: 'Artículo 9', contenido: 'Contenido del artículo 9', autor: 'Autor 9', tag: 'Tag 9', image: 'https://via.placeholder.com/150' },
        { id: 10, titulo: 'Artículo 10', contenido: 'Contenido del artículo 10', autor: 'Autor 10', tag: 'Tag 10', image: 'https://via.placeholder.com/150' },
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
