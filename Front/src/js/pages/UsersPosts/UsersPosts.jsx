import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/CreatePost/CreatePost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import postService from '../../services/postService'; // Importa el servicio de posts
import './UsersPosts.css';
import PostDetails from '../../components/dev/PostDetails/PostDetails';

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
            <Link to={`/postDetails/${articulo.id}`}>
              <PostDetails blog={articulo} />
            </Link>
          </li>
        ))}
      </ul>
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default UsersPosts;
