import axios from 'axios';

class RoleService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/role'
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    /* Ver todos los Roles */
    getRoles() {
        return this.api.get(`/`)
    }
    /* Crear Role */
    createRole(name) {
        return this.api.post('/store', name)
    }
    /* Ver un Role */
    getOneRole(id) {
        return this.api.get(`/show/${id}`)
    }
    /* Update Role */
    UpdateRole(id, newName) {
        return this.api.put(`/update/${id}`, newName)
    }
    /* Delete Role */
    deleteRole(id) {
        return this.api.delete(`/destroy/${id}`)
    }
}
const roleService = new RoleService();
export default roleService;