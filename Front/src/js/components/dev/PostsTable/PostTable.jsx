import postService from "../../../services/postService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavToggle from "../FavToggle/FavToggle";
import "./PostTable.css";
import { useTranslation } from "react-i18next";
import { FaTrash, FaTrashRestore } from "react-icons/fa";

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

export default function PostTable({ posts, currentPage, postsPerPage, onPageChange, setPosts, rechargePosts, deleteAbaible, restoreAbaible }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <table className="w-full rounded-box overflow-hidden text-center">
        <thead>
          <tr>
            <th className="bg-[#846a6a] text-[#eef0f2] font-sans text-[1rem] font-bold px-3 py-2"></th>
            <th className="bg-[#846a6a] text-[#eef0f2] font-sans text-[1rem] font-bold px-3 py-2">{t("postTable.title")}</th>
            <th className="bg-[#846a6a] text-[#eef0f2] font-sans text-[1rem] font-bold px-3 py-2">{t("postTable.publishedAt")}</th>
            <th className="bg-[#846a6a] text-[#eef0f2] font-sans text-[1rem] font-bold px-3 py-2">{t("counter.views")}</th>
            <th className="bg-[#846a6a] text-[#eef0f2] font-sans text-[1rem] font-bold px-3 py-2">{t("postTable.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item, index) => {
            const totalIndex = indexOfFirstPost + index + 1;
            return (
              <tr
                key={index}
                onClick={() => navigate(`/postDetails/${item.id}`)}
                className="cursor-pointer even:bg-[#d3d4d0] hover:bg-[#5a5a5a] hover:text-white"
              >
                <th className="font-sans text-sm px-3 py-2">{totalIndex}</th>
                <td className="font-sans text-sm px-3 py-2">{item.title}</td>
                <td className="font-sans text-sm px-3 py-2">{item.created_at}</td>
                <td className="font-sans text-sm px-3 py-2">{item.views}</td>
                <td className="font-sans text-sm px-3 py-2">
                  <div className="flex flex-row items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {!restoreAbaible && (
                      <FavToggle
                        fav={item.isFav}
                        id={item.id}
                        onToggle={handleFavToggle}
                        className="btn btn-sm bg-[#846a6a] h-10 w-10"
                        title={t("postTable.fav")}
                      />
                    )}
                    {deleteAbaible && (
                      <button
                        title={t("postTable.delete")}
                        className="btn btn-sm bg-[#846a6a] text-error h-10 w-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          postService.deletePost(item.id).then(() => {
                            setPosts((prev) => prev.filter((post) => post.id !== item.id));
                            rechargePosts();
                          });
                        }}
                      >
                        <FaTrash />
                      </button>
                    )}
                    {restoreAbaible && (
                      <button
                        title={t("postTable.restore")}
                        className="btn btn-sm bg-[#846a6a] h-10 w-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          postService.restorePost(item.id).then(() => {
                            setPosts((prev) => prev.filter((post) => post.id !== item.id));
                            rechargePosts();
                          });
                        }}
                      >
                        <FaTrashRestore className="text-success" />
                      </button>
                    )}
                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 mx-auto">
        <div className="join flex justify-center">
          {pageCount > 1 &&
            Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                onClick={() => {
                  onPageChange(i + 1), rechargePosts();
                }}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}