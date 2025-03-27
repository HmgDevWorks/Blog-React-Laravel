import axios from 'axios';

class ServicioCategorias {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/categories'
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getCategorias() {
        return this.api.get('/')
    }


    getOneCategoria(category_id) {
        return this.api.get(`/show/${category_id}`)
    }

    gerPostForCategory(name) {
        return this.api.get(`/posts/${name}`)
    }
    
    createCategoria(data) {
        return this.api.post('/', data)
    }
    editCategoria(id, data) {
        return this.api.put(`/${id}`, data)
    }

    deleteCategoria(id) {
        return this.api.delete(`/${id}`)
    }

}
const servicioCategorias = new ServicioCategorias();


export default servicioCategorias;
