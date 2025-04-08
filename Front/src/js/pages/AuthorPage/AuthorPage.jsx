import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import "./AuthorPage.css";
import { useAlert } from '../../bootstrap/contexts/AlertContext';
import postService from '../../services/postService';
import userService from '../../services/userService';
import PostTablePagination from '../../components/dev/PostTablePagination/PostTablePagination';
import { useTranslation } from 'react-i18next';
import Separador from '../../components/dev/Separador/Separador';
import { AuthContext } from '../../bootstrap/contexts/AuthContext';


const AuthorPage = () => {
  const { t } = useTranslation();
  const { authorId } = useParams();
  const { loggedUser } = useContext(AuthContext);


  const { addError, addSuccess } = useAlert();
  const [author, setAuthor] = useState({
    name: "Nombre default"
  })

  useEffect(() => {
    userService.getUserById(authorId)
      .then(response => {
        setAuthor(response.data);
      }).catch(error => {
        addError(t(error.message));
      });
  }, [authorId]);

  return (
    <div className='author-page divide-y-4 divide-transparent'>
      <h1 className='author mb-8'>{t("authorPage.title",)} {author.name_user} </h1>
      <h2 className="text-center">{t("authorPage.publishedPosts")}</h2>
      <PostTablePagination filter={"published"} user_id={authorId} />
      {(loggedUser.id == authorId) &&
        (<>
          <Separador />
          <h2 className="text-center">{t("authorPage.deletedPosts")}</h2>
          <PostTablePagination filter={"deleted"} user_id={authorId} />
        </>)
      }
    </div>
  );
};

export default AuthorPage;
