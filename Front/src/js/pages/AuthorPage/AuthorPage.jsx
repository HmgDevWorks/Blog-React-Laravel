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
        console.log(error);
        addError(error.mensaje);
      });

    // postService.getUserPosts(authorId)
    //   .then(response => {
    //     setAuthorPosts(response.data);
    //   }).catch(error => {
    //     console.log(error);
    //     addError(error.mensaje);
    //   });

    // if (loggedUser.role === "reader")
    //   Navigate("/");
    // else {
    //   postService.getUserPosts(authorId)
    //     .then(response => {
    //       setAuthorPosts(response.data);
    //     }).catch(error => {
    //       console.log(error);
    //       addError(error.mensaje);
    //     });
    // }
  }, [authorId]);

  return (
    <div className='author-page divide-y-4'>
      <h1 className='author'>{t("authorPage.title",)} {author.name_user} </h1>
      <PostTablePagination filter={"published"} user_id={authorId} />
      {(loggedUser.id === authorId) &&
        (<>
          <Separador />
          <PostTablePagination filter={"deleted"} user_id={authorId} />
        </>)
      }
    </div>
  );
};

export default AuthorPage;
