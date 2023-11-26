const { express } = require('../../config/lib');
const router = express.Router();

router.get('/detail/:movieId', (req, res, next) => {
    const id = req.params.movieId;

});

router.get('/search', control.searchPage);

router.get('/detail', control.detailPerson);


router.use('/', express.json());

router.post('/add', control.addPerson);

router.post('/update', control.updatePerson);

router.post('/delete', control.deletePerson);



module.exports = { router };