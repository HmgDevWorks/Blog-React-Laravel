import BaseService from './baseService';

class ServicioCategorias extends BaseService {

    constructor() {
super("categories/");
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
