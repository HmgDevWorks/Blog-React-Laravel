import axios from 'axios';

class ServicioCategorias {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/categories'
        })




    }
    getCategorias() {
        return this.api.get('/')
    }


    getOneCategoria(category_id) {
        return this.api.get(`/show/${category_id}`)
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
