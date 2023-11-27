const { Movie } = require('../model/movie.m');

module.exports = {
    detail: async (req, res, next) => {
        const id = req.params.movieId;
        const result = await Movie.getDetail(id);
        res.json(result);
    },

    reviewPage: async (req, res, next) => {
        const id = req.params.movieId;
        const pageNum = parseInt(req.params.pageNum) || 0;
        const result = await Movie.getPageReviewList(id, pageNum);
        res.json(result);
    },

    search: async (req, res, next) => {
        const key = req.params.key;
        const result = await Movie.search(key);
        res.json(result);
    },
}