import BaseService from './baseService';

class StatService extends BaseService {
    
    constructor() {
        super("stats/");
    }

    /* Current User Fav */
    getCounterStats() {
        return this.api.get(`counter`);
    }
}
const statService = new StatService();

export default statService;