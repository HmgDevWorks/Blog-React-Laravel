import axios from 'axios';

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api'
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }
    getUsers() {
        return this.api.get('/')
    }
    createUser(data) {
        console.log(data)
        return this.api.post('/register', data)
    }
    getOneUser(data) {
        return this.api.post(`/login`, data)
    }
    getUserById(id) {
        return this.api.get(`/users/${id}`)
    }
    
    editUser(id, data) {
        return this.api.put(`/${id}`, data)
    }
    deleteUser(id) {
        return this.api.delete(`/${id}`)
    }
    verifyUser(token) {
        return this.api.get('/verify-token',
            { headers: { Authorization: `Bearer ${token}` } }
        )
    }
}

const userService = new UserService();

export default userService;
