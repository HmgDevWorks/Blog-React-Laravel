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

  useEffect(() => {
    if (loggedUser) {  // Eliminar el punto y coma innecesario
      const request = postService.getPostsByStatus({
        status: "draft"
      });

      request
        .then(response => {
          console.log('DATOS:', response);
          setDataDraft(response.data);  // Guarda los datos de borradores en el estado
        })
        .catch(error => {
          console.error(error);
          addError("Error al obtener los borradores. Intenta de nuevo más tarde.");
        });
    }
  }, [addError, loggedUser]);  // Asegúrate de que los valores dependientes sean correctos

  // useEffect(() => {
  //   if (!loggedUser) return;
  //   const request = postService.getUserPosts(loggedUser.id);

  //   request
  //     .then(response => {
  //       // console.log('DATOS:', response.data);
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       addError("Error al obtener las publicaciones. Intentalo de nuevo mas tarde");
  //     });

  // }, []);
  return (
    <div className="mt-4 mb-4">
      <Box title={t("createPostPage.draft")}>
        <DraftTab tabs={dataDraft} />
      </Box>
      <Separador />
      <Editor />
      <Separador />
      <Box title={t("createPostPage.posts")}>
        <PostTablePagination filter={"published"} user_id={loggedUser.id} />
      </Box>
    </div>
  );
};

export default CreatePostPage;
