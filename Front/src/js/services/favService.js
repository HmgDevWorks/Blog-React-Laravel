import BaseService from './baseService';

class FavService extends BaseService {

    constructor() {
        super("favorites/")
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