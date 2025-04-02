import { useState, useEffect, useContext } from 'react';
import PostTable from '../PostsTable/PostTable';
import postService from '../../../services/postService';
import favService from '../../../services/favService';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';

export default function PostTablePagination({ filter, id = 0 }) { //, search = ""
    const { loggedUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        console.log("USE EFFECT EJECUTADO", { filter, loggedUser, id });

        if (!loggedUser) {
            console.warn("loggedUser aún no está disponible");
            return; // Salir del useEffect si loggedUser es undefined
        }
        console.log("DETNRO");
        const fetchPosts = () => {
            let postPromise;
            console.log(loggedUser)
            // if (search !== "") {
            //     postPromise = postService.getPosts();
            // } else {
            switch (filter) {
                case 'favs':
                    postPromise = favService.getFavById(loggedUser.id);
                    break;
                case 'published':
                    postPromise = postService.getPostsPublished(loggedUser.id); //loggedUser.id
                    break;
                case 'draft':
                    postPromise = postService.getPostsByStatus({ status: "draft" });
                    break;
                case 'deleted':
                    postPromise = postService.getPostsByStatus({ status: "deleted" });
                    break;
                default:
                    postPromise = postService.getPosts();
                    break;
            }

            postPromise
                .then(({ data }) => {
                    console.log("DAAATA", data);
                    setPosts(data);
                })
                .catch(error => {
                    console.error("Error fetching posts:", error);
                    // Aquí podrías mostrar un mensaje de error al usuario
                });

        }
        fetchPosts();
    }, [filter, loggedUser, id]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Recargar los posts al cambiar de página
    };

    return (
        <PostTable
            posts={posts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
        // rechargePosts={fetchPosts}
        // setPosts={setPosts}
        />
    );
}