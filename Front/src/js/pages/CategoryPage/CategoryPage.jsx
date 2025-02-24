import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import CategoryPageItem from "../../components/dev/CategoryPageItem/CategoryPageItem";
import ArticleFinder from "../../components/dev/article_finder/Article_finder_daisy";
import './CategoryPage.css';

const CategoryPage = () => {
  const { id_categoria } = useParams();
  const [numArticulos, setNumArticulos] = useState(0);

  const enlacesDePrueba = [
    { id: 1, title: 'Enlace 1', url: '/enlace1' },
    { id: 2, title: 'Enlace 2', url: '/enlace2' },
    { id: 3, title: 'Enlace 3', url: '/enlace3' },
    { id: 4, title: 'Enlace 4', url: '/enlace4' },
    { id: 5, title: 'Enlace 5', url: '/enlace5' },
    { id: 6, title: 'Enlace 6', url: '/enlace6' },
    { id: 7, title: 'Enlace 7', url: '/enlace7' },
    { id: 8, title: 'Enlace 8', url: '/enlace8' },
    { id: 9, title: 'Enlace 9', url: '/enlace9' },
    { id: 10, title: 'Enlace 10', url: '/enlace10' },
  ];

  useEffect(() => {
    // Simulación de llamada a la base de datos para obtener el número de artículos
    // Reemplaza esto con tu lógica de llamada a la API
    const fetchNumArticulos = async () => {
      try {
        // Simulación de llamada a la API
        const response = await fetch(`/api/categorias/${id_categoria}/numArticulos`);
        const data = await response.json();
        setNumArticulos(data.numArticulos);
      } catch (error) {
        console.error('Error al obtener el número de artículos:', error);
      }
    };

    fetchNumArticulos();
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
      {/* comentado para elegir de que forma hacerlo si con componente 
      o directamente en la pagina para que sea lo mas facil de conectar con el back
       */}
      {/* <CategoryPageItem />  */} 
      <div className="indiceCategorias text-center p-2">
        Indice
      </div>
      <ul className="enlaces-lista">
        {enlacesDePrueba.map((enlace) => (
          <li key={enlace.id} className="enlace-item">
            <a href={enlace.url} className="enlace">
              {enlace.title}
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
