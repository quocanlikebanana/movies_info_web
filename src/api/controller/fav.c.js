const { Fav } = require('../model/fav.m');

module.exports = {
    getByPage: async (req, res, next) => {
        const pageNum = req.params.pageNum;
        const result = await Fav.getByPage(pageNum);
        // data, total_page
        res.json(result);
    },

    insertFav: async (req, res, next) => {
        const id = req.params.movieId;
        const result = await Fav.insert(id);
        res.json({});
    },

    deleteFav: async (req, res, next) => {
        const id = req.params.movieId;
        const result = await Fav.delete(id);
        res.json({});
    },
}