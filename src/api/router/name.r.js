const { express } = require('../../config/lib');
const router = express.Router();
const { Name } = require('../model/name.m');


router.get('/detail/:nameId', async (req, res, next) => {
    const id = req.params.nameId;
    const result = await Name.getDetail(id);
    res.json(result);
});

router.get('/search/:key', async (req, res, next) => {
    const key = req.params.key;
    const result = await Name.search(key);
    res.json(result);
});

module.exports = { router };
