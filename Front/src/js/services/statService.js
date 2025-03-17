import axios from 'axios';

class StatService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/stats/'
        });
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        });
    }

    /* Current User Fav */
    getCounterStats() {
        return this.api.get(`counter`);
    }
}
const statService = new StatService();

export default statService;