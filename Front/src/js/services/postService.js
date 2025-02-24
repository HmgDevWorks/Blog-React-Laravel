import axios from 'axios';

class PostService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/posts'
        })
    }

    getOnePost(blog_id) {
        return this.api.get(`/show/${blog_id}`)
    }
    /* All posts */
    getPosts() {
        return this.api.get('/showAll')
    }

    /* Publicar */
    createPost(data) {
        return this.api.post('/store', data)
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