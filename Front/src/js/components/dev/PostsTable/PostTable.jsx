import postService from "../../../services/postService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavToggle from "../FavToggle/FavToggle";
import "./PostTable.css";
import { useTranslation } from "react-i18next";

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

export default function PostTable({ posts, currentPage, postsPerPage, onPageChange, setPosts }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  console.log("QUE COÑO RECIBO?", posts);
  if (!Array.isArray(posts)) {
    return (
      <div className="alert alert-warning">
        {posts?.error || "Error desconocido al cargar los posts"}
      </div>
    );
  }
  if (posts.length == 0) {
    return (
      <div className="alert alert-info">
        No hay posts
      </div>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const handleFavToggle = (postId, newFavState) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, isFav: newFavState } : post
      )
    );
  };
  return (
    <div className="overflow-x-auto">
      <table className="posts-table table rounded-box">
        <thead>
          <tr>
            <th></th>
            <th>{t("postTable.title")}</th>
            <th>{t("postTable.publishedAt")}</th>
            {/* <th>Contenido del artículo</th> */}
            <th>{t("counter.views")}</th>
            <th>{t("postTable.fav")}</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item, index) => {

            const totalIndex = indexOfFirstPost + index + 1;
            return (
              <tr
                key={index}
                onClick={() => navigate(`/postDetails/${item.id}`)}
              >
                <th>{totalIndex}</th>
                <td>{item.title}</td>
                <td>{item.created_at}</td>
                {/* <td>{item.content.length > 50 ? item.content.substring(0, 50) + "..." : item.content}</td> */}
                <td>{item.views}</td>
                <td>
                  <FavToggle
                    fav={item.isFav}
                    id={item.id}
                    onToggle={handleFavToggle} //  Se actualiza el estado global en tiempo real
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          <tr>
            <th></th>
            <th>{t("postTable.title")}</th>
            <th>{t("postTable.publishedAt")}</th>
            <th>{t("counter.views")}</th>
            <th>{t("postTable.fav")}</th>
          </tr>
        </tfoot> */}
      </table>

      <div className="flex justify-center mt-4 mx-auto">
        <div className="join flex justify-center">
          {pageCount > 1 &&
            Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                onClick={() => {
                  onPageChange(i + 1);
                  //  ESTO ES PARA SI QUEREMOS QUE AL CAMBIAR DE PAGINA SE RECARGUEN LOS POSTS ,
                  //  PARA QUE SE ELIMINEN SI HAS QUITADO EL ME GUSTA 
                  //  rechargePosts() 
                }}
              >
                {i + 1}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}