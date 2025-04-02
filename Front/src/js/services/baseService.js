import axios from 'axios';

export default class BaseService {
    
    constructor(serviceName) {
        this.api = axios.create({
            baseURL: `http://localhost:8000/api/${serviceName}`
        });
        this.api.interceptors.request.use((config) => {
            let token = sessionStorage.getItem("authToken");
            if(!token){
                token = localStorage.getItem("authToken");
            }

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` };
            }

            return config
        });
    }

    // get token () {
    //     return useContext(AuthContext).JWT;
    // }
}