import axios from 'axios';

class PostService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/posts'
        })
    }

    /* Post by Id */
    getOnePost(id) {
        return this.api.get(`/`, id)
    }
    /* All posts */
    getPosts() {
        return this.api.get('/showAll')
    }
    /* User posts */
    getPosts(id) {
        return this.api.get(`/user/${id}`)
    }
    /* Publicar */
    createPost(data) {
        return this.api.post('/store', data)
    }

    /* Show post */
    getOnePost(id) {
        return this.api.get(`/posts/show/${id}`)
    }

    /* Editar post */
    editPost(id, data) {
        return this.api.put(`/posts/update/${id}`, data)
    }

    /* Eliminar post no se si vale así */
    deletePost(id) {
        return this.api.delete(`/posts/destroy/${id}`)
    }
}
const postService = new PostService();
export default postService;