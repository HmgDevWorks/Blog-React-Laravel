import Box from "../../components/dev/box/Box";
import DraftTab from "../../components/dev/draft/DraftTab";
import { useState, useEffect, useContext } from "react";
import Editor from "../../components/dev/editor/Editor";
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
      <h1 className="text-center font-extrabold text-4xl mb-7" style={{ color: "var(--saturadoOscuro)", fontFamily: "'Abril Fatface', serif, cursive" }}>{t("createPostPage.newPage")}</h1>
      <Editor />

      <Separador />
      <Box title={t("createPostPage.draft")}>
        <DraftTab posts={dataDraft} />
      </Box>

      {/* <Separador />
      <Box title={t("createPostPage.posts")}>
        <PostTablePagination filter={"published"} user_id={loggedUser.id} />
      </Box> */}
      <Separador />

      <Editor />
    </div>
  );
};

export default CreatePostPage;
