const { express } = require('../../config/lib');
const router = express.Router();
const { Movie } = require('../model/movie.m');

router.get('/detail/:movieId', async (req, res, next) => {
    const id = req.params.movieId;
    const result = await Movie.getDetail(id);
    res.json(result);
});

router.get('/detail/review/:movieId/:pageNum', async (req, res, next) => {
    const id = req.params.movieId;
    const pageNum = req.params.pageNum;
    const result = await Movie.getPageReviewList(id, pageNum);
    res.json(result);
});

router.get('/search/:key/', async (req, res, next) => {
    const key = req.params.key;
    const result = await Movie.search(key);
    res.json(result);
});


module.exports = { router };
