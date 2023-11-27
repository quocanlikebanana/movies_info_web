const { express } = require('../../config/lib');
const { detail, reviewPage, search } = require('../controller/movie.c');

const router = express.Router();

router.get('/detail/:movieId', detail);

router.get('/detail/review/:movieId/:pageNum', reviewPage);

router.get('/search/:key', search);


module.exports = { router };