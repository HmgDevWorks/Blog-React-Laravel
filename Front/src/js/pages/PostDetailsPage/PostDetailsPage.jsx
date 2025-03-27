import { useParams } from 'react-router-dom';

import PostDetails from '../../components/dev/PostDetails/PostDetails.jsx';
import postService from '../../services/postService.js';
import { useState, useEffect } from 'react';
import Loader from '../../components/dev/Loader/Loader.jsx'
import { useAlert } from "../../bootstrap/contexts/AlertContext.jsx";

const PostDetailsPage = () => {
  const { addError, addSuccess } = useAlert();

  const { blog_id } = useParams();

  const [blog, setBlog] = useState()


  const loadPost = () => {
    postService
      .getOnePost(blog_id)
      .then(({ data }) => {
        setBlog(data.post);
      })
      .catch(error => {
        console.log("ERROR", error);
        const data = JSON.parse(error.response.data.message);
        addError(data.error);
      });
  }

  useEffect(() => {
    loadPost()
  }, [])




  return (
    <div>
      {blog ? <PostDetails blog={blog} /> : <Loader />}
    </div >

  );
};

export default PostDetailsPage;
