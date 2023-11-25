const { express } = require('../../config/libs');
const router = express.Router();
const control = require('../controller/person.c');


router.get('/page', control.getPage);

router.get('/search', control.searchPage);

router.get('/detail', control.detailPerson);


router.use('/', express.json());

router.post('/add', control.addPerson);

router.post('/update', control.updatePerson);

router.post('/delete', control.deletePerson);



module.exports = { router };