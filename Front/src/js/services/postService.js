import BaseService from './baseService';

class PostService extends BaseService {

    constructor() {
        super("posts/")
    }

    getOnePost(blog_id) {
        return this.api.get(`/show/${blog_id}`)
    }

    /* All posts */
    getPosts() {
        return this.api.get('/show')
    }

    /* Published posts of a user */
    getPostsPublished(id) {
        return this.api.get(`/published/${id}`);
    }

    /* Auth user posts by status */
    getPostsByStatus(data) {
        return this.api.get('/status', { params: data });
    }

    /* User posts */
    getUserPosts(id) {
        return this.api.get(`/user/${id}`)
    }

    /* Publish Post */
    createPost(data) {
        return this.api.post('/store', data)
    }
    // // getPostByTitle(title) {
    //     return this.api.get(`/search/${title}`)
    // }

    /* News (10 posts) */
    getLastTenPost() {
        return this.api.get('/news')
    }

    /* Edit post */
    editPost(id, data) {
        return this.api.put(`/update/${id}`, data)
    }

    /* Delete post */
    deletePost(id) {
        return this.api.delete(`/destroy/${id}`)
    }

    /* Restore post */
    restorePost(id) {
        return this.api.put(`/restore/${id}`)
    }
}
const postService = new PostService();

export default postService;