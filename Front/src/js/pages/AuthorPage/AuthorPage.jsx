import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./AuthorPage.css";
import PostTable from '../../components/dev/PostsTable/PostTable';
import { useAlert } from '../../bootstrap/contexts/AlertContext';
import postService from '../../services/postService';
import userService from '../../services/userService';


const AuthorPage = () => {
  const { authorId } = useParams();

  const { addError, addSuccess } = useAlert();
  const [authorPosts, setAuthorPosts] = useState([]);
  const [author, setAuthor] = useState({
    name: "Nombre default"
  })

  useEffect(() => {
    console.log(authorId);
    userService.getUserById(authorId)
      .then(response => {
        console.log(response);
        setAuthor(response.data);
      }).catch(error => {
        console.log(error);
        addError(error.mensaje);
      });

    postService.getUserPosts(authorId)
      .then(response => {
        console.log(response);
        setAuthorPosts(response.data);
      }).catch(error => {
        console.log(error);
        addError(error.mensaje);
      });
  }, [authorId]);

  return (
    <div className='author-page'>
      <h1 className='author'>Posts de {author.name_user}</h1>
      {authorPosts && <PostTable posts={authorPosts} />}
    </div>
  );
};

export default AuthorPage;
