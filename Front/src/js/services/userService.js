import axios from 'axios';

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api'
        })
    }
    getUsers() {
        return this.api.get('/users')
    }
    createUser(data) {
        console.log(data)
        return this.api.post('/register', data)
    }
    getOneUser(data) {
        return this.api.post(`/login`, data)
    }
    editUser(id, data) {
        return this.api.put(`/${id}`, data)
    }
    deleteUser(id) {
        return this.api.delete(`/${id}`)
    }
}

const userService = new UserService();

export default userService;
