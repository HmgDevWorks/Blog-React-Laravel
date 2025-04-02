import BaseService from './baseService';

class categoriesServices extends BaseService {

    constructor() {
        super("categories/");
    }

    getCategorias() {
        return this.api.get('/')
    }


    getOneCategoria(category_id) {
        return this.api.get(`/show/${category_id}`)
    }

    getPostForCategory(name) {
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
const CategoriesServices = new categoriesServices();


export default CategoriesServices;
