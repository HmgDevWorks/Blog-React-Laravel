import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/backToTop/BackToTop";
import DetallesBlog from "../../components/dev/DetallesBlog/DetallesBlog";
import postService from '../../services/postService'; // Importa el servicio de posts
import './UsersPosts.css';

const UsersPosts = () => {
  const { id_usuario } = useParams();
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    // Llama a la API para obtener los blogs del usuario específico
    postService.getUserPosts(id_usuario)
      .then(response => {
        const data = response.data;
        setArticulos(data);
      })
      .catch(error => {
        console.error('Error al obtener los blogs del usuario:', error);
      });
  }, [id_usuario]);

  return (
    <div>
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

export default UsersPosts;
