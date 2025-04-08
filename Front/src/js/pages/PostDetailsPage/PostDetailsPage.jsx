import { useParams } from 'react-router-dom';

import PostDetails from '../../components/dev/PostDetails/PostDetails.jsx';
import postService from '../../services/postService.js';
import { useState, useEffect } from 'react';
import Loader from '../../components/dev/Loader/Loader.jsx'
import { useAlert } from "../../bootstrap/contexts/AlertContext.jsx";
import FavToggle from '../../components/dev/FavToggle/FavToggle.jsx';

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
        addError(t(error.message));
      });
  }

  useEffect(() => {
    loadPost()
  }, [])




  return (
    <div className='pb-4'>
      {blog
        ?
        <>
          <PostDetails blog={blog} />
          <FavToggle fav={blog.isFav} id={blog.id} />
        </>
        :
        <Loader />}

    </div >

  );
};

export default PostDetailsPage;
