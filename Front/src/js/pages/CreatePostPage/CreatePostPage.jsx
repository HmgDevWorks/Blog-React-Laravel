import React from "react";
import Box from "../../components/dev/Box/Box";
import DraftTab from "../../components/dev/Draft/DraftTab";
import { useState, useEffect } from "react";
import PostTable from "../../components/dev/PostsTable/PostTable";
import Editor from "../../components/dev/Editor/Editor";
import Separador from "../../components/dev/Separador/Separador";
import postService from "../../services/postService";
import { useAlert } from "../../bootstrap/contexts/AlertContext";

// import Separador from "../../components/dev/separador/Separador";

const CreatePostPage = () => {
  const { addError, addSuccess } = useAlert();

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
        addError("Error al obtener los borradores. Intentalo de nuevo mas tarde.");
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
        addError("Error al obtener las publicaciones. Intentalo de nuevo mas tarde");
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

export default CreatePostPage;
