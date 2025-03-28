import BaseService from './baseService';

class UserService extends BaseService {
    
    constructor() {
        super("");
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
    getUserById(id) {
        return this.api.get(`/users/${id}`)
    }



    requestPasswordReset(data) {
        return this.api.post(`/password/email`,data);
    }
    verifyResetCode(data) {
        return this.api.get(``,data);
    }
    resetPassword(data) {
        return this.api.post(`/password/reset`,data);
    }
    updatePassword(data){
        return this.api.put("/users/updatePassword", data)
    }



    getNonConfidentialUserById(id){
        return this.api.get(`/users/non-confidential/${id}`);
    }
    
    editUser(data) {
        console.log("DATA", data);
        return this.api.put(`/users/update`, data);
    }
    // editUser(id, data) {
    //     return this.api.put(`/users/update/${id}`, data)
    // }
    deleteUser(id) {
        return this.api.delete(`/users/destroy/${id}`)
    }
    verifyUser(token) {
        return this.api.get('/verify-token',
            { headers: { Authorization: `Bearer ${token}` } }
        )
    }
}

const userService = new UserService();

export default userService;
