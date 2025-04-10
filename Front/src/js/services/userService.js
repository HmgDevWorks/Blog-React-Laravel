import BaseService from './baseService';

class UserService extends BaseService {

    constructor() {
        super("");
    }

    getUsers() {
        return this.api.get('/users')
    }
    createUser(data) {
        return this.api.post('/register', data)
    }
    getOneUser(data) {
        return this.api.post(`/login`, data)
    }
    getUserById(id) {
        return this.api.get(`/users/${id}`)
    }

    postUserImg(img) {
        const formData = new FormData();
        formData.append('img_user', img);

        return this.api.post(`/profile/upload-avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }
    postImg(img) {
        const formData = new FormData();
        formData.append('file', img);

        return this.api.post(`/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        // Accept: "application/json",
    }

    requestPasswordReset(data) {
        return this.api.post(`/password/email`, data);
    }
    verifyResetCode(data) {
        return this.api.get(``, data);
    }
    resetPassword(data) {
        return this.api.post(`/password/reset`, data);
    }
    updatePassword(data) {
        return this.api.put("/users/updatePassword", data)
    }
    getPopularUsers() {
        return this.api.get("/popular-users")
    }


    getNonConfidentialUserById(id) {
        return this.api.get(`/users/non-confidential/${id}`);
    }

    editUser(data) {
        return this.api.put(`/users/update`, data);
    }

    // deleteUser() {
    //     return this.api.delete(`/users/destroy`)
    // }
    deleteUser(id) {
        return this.api.delete(`/admin/delete/${id}`);
    }
    restoreUser(id) {
        return this.api.put(`/admin/restore/${id}`);
    }
    verifyUser(token) {
        return this.api.get('/verify-token',
            { headers: { Authorization: `Bearer ${token}` } }
        )
    }
}

const userService = new UserService();

export default userService;
