const { express } = require('../../config/lib');
const { getByPage, insertFav, deleteFav } = require('../controller/fav.c');

const router = express.Router();

router.get('/:pageNum', getByPage);

router.get('/insert/:movieId', insertFav);

router.get('/delete/:movieId/', deleteFav);


module.exports = { router };
