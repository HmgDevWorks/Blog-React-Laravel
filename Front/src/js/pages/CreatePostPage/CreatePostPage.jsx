import React from "react";
import Box from "../../components/dev/Box/Box";
import DraftTab from "../../components/dev/Draft/DraftTab";
import { useState, useEffect, useContext } from "react";
import Editor from "../../components/dev/Editor/Editor";
import Separador from "../../components/dev/Separador/Separador";
import postService from "../../services/postService";
import { AuthContext } from '../../bootstrap/contexts/AuthContext';
import { useTranslation } from "react-i18next";

const CreatePostPage = () => {
  const { t } = useTranslation();
  const { loggedUser } = useContext(AuthContext);

  const [dataDraft, setDataDraft] = useState([]);

  useEffect(() => {
    if (!loggedUser) return;

    const request = postService.getPostsByStatus({
      status: "draft"
    });

    request
      .then(({ data }) => {
        setDataDraft(data);  // Guarda los datos de borradores en el estado
      })
      .catch(error => {
        console.error(error);
        // addError("Error al obtener los borradores. Intenta de nuevo más tarde.");
      });
  }, [loggedUser]);

  return (
    <div className="mt-4 mb-4">
      <Box title={t("createPostPage.draft")}>
        <DraftTab posts={dataDraft} />
      </Box>
      <Separador />
      <h1 className="text-center">{t("createPostPage.newPage")}</h1>
      <Editor />
    </div>
  );
};

export default CreatePostPage;
