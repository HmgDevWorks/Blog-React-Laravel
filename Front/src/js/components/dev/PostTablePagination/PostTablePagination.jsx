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
                    postPromise = postService.getPosts(); //loggedUser.id
                    break;
                case 'draft':
                    postPromise = postService.getPosts();
                    break;
                case 'deleted':
                    postPromise = postService.getPosts();
                    break;
                default:
                    postPromise = postService.getPosts();
                    break;
            }
            // }

            postPromise
                .then(({ data }) => {
                    setPosts(data.original);
                    console.log(data.original)
                })
                .catch(error => {
                    console.error("Error fetching posts:", error);
                    // Aquí podrías mostrar un mensaje de error al usuario
                });
        };

        fetchPosts();
    }, [filter, loggedUser]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <PostTable
            posts={posts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
        />
    );
}