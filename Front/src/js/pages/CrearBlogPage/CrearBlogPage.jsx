import React from "react";
import Box from "../../components/dev/box/Box";
import DraftTab from "../../components/dev/draft/DraftTab";
import { useState, useEffect } from "react";
import PostTable from "../../components/dev/PostsTable/PostTable";
import Editor from "../../components/dev/editor/Editor";
import Separador from "../../components/dev/Separador/Separador";
import postService from "../../services/postService";

// import Separador from "../../components/dev/separador/Separador";

const CrearBlogPage = () => {
  const [dataDraft, setDataDraft] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const request = postService.getUserPosts(userId);

    request
      .then(response => {
        setDataDraft(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los posts:', error);
      });

  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const request = postService.getUserPosts(userId);

    request
      .then(response => {
        // console.log('DATOS:', response.data);
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los posts:', error);
      });

  }, []);

  return (
    <div>
      <Box title="Borrador">
        <DraftTab tabs={dataDraft} />
      </Box>
      <Separador />
      <Editor />
      <Separador />
      <Box title="Mis publicaciones">
        <PostTable posts={posts} />
      </Box>
    </div>
  );
};

export default CrearBlogPage;
