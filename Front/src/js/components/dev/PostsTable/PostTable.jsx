import postService from "../../../services/postService";
import { useEffect, useState } from "react";
import "./PostTable.css";
import { useNavigate } from "react-router-dom";
import FavToggle from "../FavToggle/FavToggle";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export default function PostTable({ posts }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="posts-table">
        <thead>
          <tr>
            <th></th>
            <th>Título</th>
            <th>Fecha de publicación</th>
            {/* <th>Contenido del artículo</th> */}
            <th>Alcance</th>
            <th>Favoritos</th>
          </tr>
        </thead>
        <tbody>
          {posts.slice(0, 10).map((item, index) => (
            <tr
              key={index}
              onClick={() => navigate(`/detallesBlog/${item.id}`)}
            >
              <th>{index + 1}</th>
              <td>{item.title}</td>
              <td>{formatDate(item.created_at)}</td>
              {/* <td>{item.content.length > 50 ? item.content.substring(0, 50) + "..." : item.content}</td> */}
              <td>{item.views}</td>
              <td>
                <FavToggle
                  fav={false}
                  // fav={item.isFav}
                  id={item.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Título</th>
            <th>Fecha de publicación</th>
            {/* <th>Contenido del artículo</th> */}
            <th>Alcance</th>
            <th>Favoritos</th>
          </tr>
        </tfoot>
      </table>
    </div>);
}