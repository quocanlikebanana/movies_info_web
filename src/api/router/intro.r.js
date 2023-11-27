const { express } = require('../../config/lib');
const { getIntro } = require('../controller/intro.c');

const router = express.Router();

router.get('/', getIntro);

module.exports = { router };