import axios from 'axios';

class FavService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8000/api/favorites/'
        });
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    /* Current User Fav */
    getUserFavs() {
        return this.api.get();
    }
    /* User Fav Posts */
    getFavById(userId) {
        return this.api.get(`${userId}`);
    }
    /* Publicar */
    addFav(postId) {
        return this.api.post(`store/${postId}`);
    }
    /* Eliminar post no se si vale así */
    removeFav(postId) {
        return this.api.delete(`destroy/${postId}`);
    }
}
const favService = new FavService();

export default favService;