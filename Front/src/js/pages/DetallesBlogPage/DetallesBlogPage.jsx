import { useParams } from 'react-router-dom';

import DetallesBlog from '../../components/dev/DetallesBlog/DetallesBlog';
import postService from '../../services/postService';
import { useState, useEffect } from 'react';
import Loader from '../../components/dev/Loader/Loader.jsx'

const DetallesBlogPage = () => {
  const { blog_id } = useParams();

  const [blog, setBlog] = useState()


  const loadPost = () => {
    postService
      .getOnePost(blog_id)
      .then(({ data }) => {
        console.log(data.original.post)
        setBlog(data.original.post)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadPost()
  }, [])




  return (
    <div>
      {blog ? <DetallesBlog blog={blog} /> : <Loader />}
    </div >

  );
};

export default DetallesBlogPage;
