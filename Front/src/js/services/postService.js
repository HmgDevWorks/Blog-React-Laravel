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
    getPostsPublished(id) {
        return this.api.get(`/published/${id}`);
    }
    getPostsByStatus(userId, data) {
        console.log(data)
        return this.api.get(`/status/${userId}`, { params: data });
    }
    /* User posts */
    getUserPosts(id) {
        return this.api.get(`/user/${id}`)
    }
    /* Publicar */
    createPost(data) {
        return this.api.post('/store', data)
    }
    getPostByTitle(title) {
        return this.api.get(`/searchPosts`, { params: { title } })
    }
    getAuthorPost(name) {
        return this.api.get(`/searchAuthors`, { params: { name } })
    }
    getLastTenPost() {
        return this.api.get('/news')
    }

    /* Editar post */
    editPost(id, data) {
        return this.api.put(`/update/${id}`, data)
    }

    /* Eliminar post no se si vale así */
    deletePost(id) {
        return this.api.delete(`/destroy/${id}`)
    }
}
const postService = new PostService();

export default postService;