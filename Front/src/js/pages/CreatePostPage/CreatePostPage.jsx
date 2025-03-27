import React from "react";
import Box from "../../components/dev/Box/Box";
import DraftTab from "../../components/dev/Draft/DraftTab";
import { useState, useEffect, useContext } from "react";
import PostTablePagination from "../../components/dev/PostTablePagination/PostTablePagination";
import Editor from "../../components/dev/Editor/Editor";
import Separador from "../../components/dev/Separador/Separador";
import postService from "../../services/postService";
import { useAlert } from "../../bootstrap/contexts/AlertContext";
import { AuthContext } from '../../bootstrap/contexts/AuthContext';
import { useTranslation } from "react-i18next";
// import Separador from "../../components/dev/separador/Separador";

const CreatePostPage = () => {
  const { t } = useTranslation();
  const { loggedUser } = useContext(AuthContext);
  const { addError, addSuccess } = useAlert();

  const [dataDraft, setDataDraft] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!loggedUser) return;
    const request = postService.getUserPosts(loggedUser.id);

    request
      .then(response => {
        setDataDraft(response.data);
      })
      .catch(error => {
        addError("Error al obtener los borradores. Intentalo de nuevo mas tarde.");
      });

  }, []);

  useEffect(() => {
    if (!loggedUser) return;
    const request = postService.getUserPosts(loggedUser.id);

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
    <div className="mt-4 mb-4">
      <Box title={t("createPostPage.draft")}>
        <DraftTab tabs={dataDraft} />
      </Box>
      <Separador />
      <Editor />
      <Separador />
      <Box title={t("createPostPage.posts")}>
        <PostTablePagination filter={"published"} />
      </Box>
    </div>
  );
};

export default CreatePostPage;
