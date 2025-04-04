import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./AuthorPage.css";
import { useAlert } from '../../bootstrap/contexts/AlertContext';
import postService from '../../services/postService';
import userService from '../../services/userService';
import PostTablePagination from '../../components/dev/PostTablePagination/PostTablePagination';
import { useTranslation } from 'react-i18next';

const AuthorPage = () => {
  const { t } = useTranslation();
  const { authorId } = useParams();

  const { addError, addSuccess } = useAlert();
  const [authorPosts, setAuthorPosts] = useState([]);
  const [author, setAuthor] = useState({
    name: "Nombre default"
  })
  useEffect(() => {

    userService.getUserById(authorId)
      .then(response => {
        setAuthor(response.data);
      }).catch(error => {
        console.log(error);
        addError(error.mensaje);
      });

    postService.getUserPosts(authorId)
      .then(response => {
        setAuthorPosts(response.data);
      }).catch(error => {
        console.log(error);
        addError(error.mensaje);
      });
  }, [authorId]);

  return (
    <div className='author-page'>
      <h1 className='author'>{t("authorPage.title",)} {author.name_user} </h1>
      {authorPosts && <PostTablePagination filter={"published"} user_id={authorId} />}
    </div>
  );
};

export default AuthorPage;
