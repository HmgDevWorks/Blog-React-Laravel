import { useState, useEffect, useContext } from 'react';
import PostTable from '../PostsTable/PostTable';
import postService from '../../../services/postService';
import favService from '../../../services/favService';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';

export default function PostTablePagination({ filter, user_id }) { //, search = ""
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
                postPromise = postService.getPostsByStatus({ "status": 'published' });
                break;
            case 'draft':
                postPromise = postService.getPostsByStatus({ "status": 'draft' });
                break;
            case 'deleted':
                postPromise = postService.getPostsByStatus({ "status": 'deleted' });
                break;
            default:
                postPromise = postService.getUserPosts(user_id);
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
    };

    return (
        <PostTable
            posts={posts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
            rechargePosts={fetchPosts}
            setPosts={setPosts}
            deleteAbaible={(filter === 'published' && (!user_id || user_id == loggedUser.id))}
            restoreAbaible={(filter === 'deleted' && user_id == loggedUser.id)}
        />
    );
}