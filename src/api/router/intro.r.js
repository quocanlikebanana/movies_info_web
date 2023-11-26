const { express } = require('../../config/lib');
const router = express.Router();
const { Intro } = require('../model/intro.m');


router.get('/', async (req, res, next) => {
    const result = await Intro.get();
    res.json(result);
});

module.exports = { router };
