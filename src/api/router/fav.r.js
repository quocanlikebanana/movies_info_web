const { express } = require('../../config/lib');
const router = express.Router();
const { Fav } = require('../model/fav.m');


router.get('/:pageNum', async (req, res, next) => {
    const pageNum = req.params.pageNum;
    const result = await Fav.getByPage(pageNum);
    // data, total_page
    res.json(result);
});

router.get('/insert/:movieId', async (req, res, next) => {
    const id = req.params.movieId;
    const result = await Fav.insert(id);
    res.end();
});

router.get('/delete/:movieId/', async (req, res, next) => {
    const id = req.params.movieId;
    const result = await Fav.delete(id);
    res.end();
});


module.exports = { router };
