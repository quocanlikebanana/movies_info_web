const { currencyToNumber } = require('../helper/string-convert');
const { dbService } = require('../service/dbService');

class Movie {
    constructor(movieRecord) {
        this.id = movieRecord.id;
        this.awards = movieRecord.awards;
        this.box_office = movieRecord.box_office;
        this.companies = movieRecord.companies;
        this.countries = movieRecord.countries;
        this.full_title = movieRecord.full_title;
        this.genre_list = new Array(JSON.parse(movieRecord.genre_list));
        this.im_db_rating = movieRecord.im_db_rating;
        this.image = movieRecord.image;
        this.images = new Array(JSON.parse(movieRecord.images));
        this.languages = movieRecord.languages;
        this.original_title = movieRecord.original_title;
        this.plot = movieRecord.plot;
        this.plot_full = movieRecord.plot_full;
        this.posters = new Array(JSON.parse(movieRecord.posters));
        this.release_date = movieRecord.release_date;
        this.runtime_str = movieRecord.runtime_str;
        this.title = movieRecord.title;
        this.year = parseInt(movieRecord.year);
        this.reference = {
            actor_list: [],
            director_list: [],
            similar_list: [],
            writer_list: [],
            review_list: [],
        }
    }

    static async getAll() {
        const rawMovies = await (await dbService).getAll('movie');
        const movies = rawMovies.map(rawMovie => { return new Movie(rawMovie) });
        return movies;
    }

    static async getDetail(id) {
        const res = new Movie((await dbService).getDetail('movie', id));
        res.reference.actor_list = await (await dbService).getActorList(id);
        // TODO
    }
}


module.exports = { Movie };