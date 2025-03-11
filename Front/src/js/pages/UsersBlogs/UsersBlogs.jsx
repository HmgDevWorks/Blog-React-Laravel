import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import DetallesBlog from "../../components/dev/DetallesBlog/DetallesBlog";
import userService from '../../services/userService'; // Importa el servicio de usuario
import './UsersBlogs.css';

const UsersBlogs = () => {
  const { id_usuario } = useParams();
  const [numArticulos, setNumArticulos] = useState(0);
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    // Llama a la API para obtener los blogs del usuario específico
    userService.getUserBlogs(id_usuario)
      .then(response => {
        const data = response.data;
        setNumArticulos(data.numArticulos);
        setArticulos(data.articulos);
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

export default UsersBlogs;
