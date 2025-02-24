import React from "react";
import Box from "../../components/dev/box/Box";
import DraftTab from "../../components/dev/draft/DraftTab";
import { useState, useEffect } from "react";
import axios from "axios";
import PostTable from "../../components/dev/postsTable/PostTable";
import Editor from "../../components/dev/editor/Editor";
import Separador from "../../components/dev/separador/Separador";

// import Separador from "../../components/dev/separador/Separador";
const provDataDraft = [
  {
    title: "Tab 1",
    content: "Tab 1 aaaaaaaaaaaaaa",
  },
  {
    title: "Tab 2",
    content: "Tab 2 aaaaaaaaaaaaaa",
  },
  {
    title: "Tab 3",
    content: "Tab 3 aaaaaaaaaaaaaa",
  },
  {
    title: "Tab 3",
    content: "Tab 343 aa aafdfsdaaaaaaaaaa",
  },
];

const provPosts = [
  {
    title: "Post 1",
    publicationDate: "2021-10-01",
    content: "Post 1 aaaaaaaaaaaaaa",
    reach: "Publico",
  },
  {
    title: "Post 2",
    publicationDate: "2021-10-02",
    content: "Post 2 aaaaaaaaaaaaaa",
    reach: "Privado",
  },
  {
    title: "Post 3",
    publicationDate: "2021-10-03",
    content: "Post 3 aaaaaaaaaaaaaa",
    reach: "Publico",
  },
  {
    title: "Post 4",
    publicationDate: "2021-10-04",
    content: "Post 4 aaaaaaaaaaaaaa",
    reach: "Privado",
  },
];

const CrearBlogPage = () => {
  const [dataDraft, setDataDraft] = useState(provDataDraft);
  const [posts, setPosts] = useState(provPosts);

  // useEffect(() => {
  //   axios.get('/api/drafts')
  //     .then(response => {
  //       setDataDraft(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the drafts!", error);
  //     });

  //   axios.get('/api/posts')
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the posts!", error);
  //     });
  // }, []);

  return (
    <div>
      <Box title="Borrador">
        <DraftTab tabs={dataDraft} />
      </Box>
      <Separador />
      <Editor />
      <Separador />
      <Box title="Mis publicaciones">
        <PostTable posts={posts} />
      </Box>
    </div>
  );
};

export default CrearBlogPage;
