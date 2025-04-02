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
    /* User posts */
    getUserPosts(id) {
        return this.api.get(`/user/${id}`)
    }
    /* Publicar */
    createPost(data) {
        return this.api.post('/store', data)
    }
    // // getPostByTitle(title) {
    //     return this.api.get(`/search/${title}`)
    // }
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