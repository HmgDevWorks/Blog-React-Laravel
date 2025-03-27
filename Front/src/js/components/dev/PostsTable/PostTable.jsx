import postService from "../../../services/postService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavToggle from "../FavToggle/FavToggle";
import "./PostTable.css";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> main

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

export default function PostTable({ posts, currentPage, postsPerPage, onPageChange }) {
<<<<<<< HEAD
=======
  const { t } = useTranslation();
>>>>>>> main
  const navigate = useNavigate();

  if (!Array.isArray(posts)) {
    return (
      <div className="alert alert-warning">
        {posts?.error || "Error desconocido al cargar los posts"}
      </div>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  console.log("POSTS", posts);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageCount = Math.ceil(posts.length / postsPerPage);

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
                <td>{formatDate(item.created_at)}</td>
                {/* <td>{item.content.length > 50 ? item.content.substring(0, 50) + "..." : item.content}</td> */}
                <td>{item.views}</td>
                <td>
                  <FavToggle
                    fav={item.isFav}
                    id={item.id}
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

<<<<<<< HEAD
      <div className="flex justify-center mt-4">
=======
      <div className="flex justify-center mt-4 mx-auto">
>>>>>>> main
        <div className="join">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}