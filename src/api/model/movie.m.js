const { perPage } = require('../../config/global');
const { currencyToNumber } = require('../helper/string-convert');
const { dbService } = require('../service/dbService');
const { Review } = require('./review');

class Movie {
    constructor(movieRecord) {
        this.id = movieRecord.id;
        this.awards = movieRecord.awards;
        this.box_office = movieRecord.box_office;
        this.companies = movieRecord.companies;
        this.countries = movieRecord.countries;
        this.full_title = movieRecord.full_title;
        this.genre_list = JSON.parse(movieRecord.genre_list);
        this.im_db_rating = movieRecord.im_db_rating;
        this.image = movieRecord.image;
        this.images = JSON.parse(movieRecord.images);
        this.languages = movieRecord.languages;
        this.original_title = movieRecord.original_title;
        this.plot = movieRecord.plot;
        this.plot_full = movieRecord.plot_full;
        this.posters = JSON.parse(movieRecord.posters);
        this.release_date = movieRecord.release_date;
        this.runtime_str = movieRecord.runtime_str;
        this.title = movieRecord.title;
        this.year = parseInt(movieRecord.year);
        this.thumbnail = {
            actor_list: [],
            director_list: [],
            similar_list: [],
            writer_list: [],
        };
        this.total_review_page = 0;
    }

    static async getAll() {
        const rawMovies = await (await dbService).getAll('movie');
        const movies = rawMovies.map(rawMovie => { return new Movie(rawMovie) });
        return movies;
    }

    static async getDetail(id) {
        const res = new Movie(await (await dbService).getDetail('movie', id));
        res.thumbnail.actor_list = (await (await dbService).getActorList(id)).map(n => {
            return {
                id: n.id,
                name: n.name,
                image: n.image,
            }
        });
        res.thumbnail.director_list = (await (await dbService).getDirectorList(id)).map(n => {
            return {
                id: n.id,
                name: n.name,
                image: n.image,
            }
        });
        res.thumbnail.writer_list = (await (await dbService).getWriterList(id)).map(n => {
            return {
                id: n.id,
                name: n.name,
                image: n.image,
            }
        });
        res.thumbnail.similar_list = (await (await dbService).getSimilarList(id)).map(m => {
            return {
                id: m.id,
                title: m.full_title,
                image: m.image,
                year: m.year,
            }
        });
        res.total_review_page = Math.ceil((await (await dbService).getTotalReview(id)) / perPage.review);
        return res;
    }

    static async getPageReviewList(id, pageNum) {
        const res = (await (await dbService).getReviewList(id, perPage.review, pageNum));
        return res.map(r => { return new Review(r); });
    }

    static async search(key) {
        const res = (await (await dbService).searchMovie(key)).map(r => new Movie(r));
        return res;
    }

}


module.exports = { Movie };