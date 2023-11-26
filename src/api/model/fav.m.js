const { perPage } = require("../../config/global");
const { dbService } = require("../service/dbService");

class Fav {
    constructor(movieArr) {
        this.movieArr = movieArr;
    }

    static async getAll() {
        const result = await (await dbService).getAllFavMovie();
        return result;
    }

    static async getByPage(pageNum) {
        const result = await (await dbService).getPageFavMovie(perPage.fav, pageNum);
        return result;
    }

    static async insert(movieId) {
        const result = await (await dbService).insertFavMovie(movieId);
        return result;
    }

    static async delete(movieId) {
        const result = await (await dbService).deleteFavMovie(movieId);
        return result;
    }
}

module.exports = { Fav };