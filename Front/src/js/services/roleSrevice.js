import axios from 'axios';
import { AuthContext } from '../bootstrap/contexts/AuthContext';
import { useContext } from 'react';
import BaseService from './baseService';
class RoleService extends BaseService {

    constructor() {
        super("role/");
    }

    /* Ver todos los Roles */
    getRoles() {
        return this.api.get()
    }
    /* Crear Role */
    createRole(name) {
        return this.api.post('store', name)
    }
    /* Ver un Role */
    getOneRole(id) {
        return this.api.get(`show/${id}`)
    }
    /* Update Role */
    UpdateRole(user_id, newRole) {
        return this.api.put(`update/${user_id}`, newRole)
    }
    /* Delete Role */
    deleteRole(id) {
        return this.api.delete(`destroy/${id}`)
    }
}
const roleService = new RoleService();
export default roleService;