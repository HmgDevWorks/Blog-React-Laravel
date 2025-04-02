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

    const fetchPosts = () => {
        let postPromise;

        switch (filter) {
            case 'favs':
                postPromise = favService.getUserFavs();
                break;
            case 'published':
            case 'draft':
            case 'deleted':
            default:
                postPromise = postService.getPosts();
                break;
        }

        postPromise
            .then(({ data }) => {
                setPosts(data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, [filter, loggedUser]); // Se ejecuta solo cuando cambian estos valores


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
            rechargePosts={fetchPosts}
            setPosts={setPosts}

        />
    );
}