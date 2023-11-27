const { express } = require('../../config/lib');
const { detail, search } = require('../controller/name.c');

const router = express.Router();

router.get('/detail/:nameId', detail);

router.get('/search/:key', search);

module.exports = { router };
