const { express } = require('./lib');
const app = express();

const perPage = {
    review: 3,
    search: 15,
    fav: 15,

};

module.exports = { app, perPage };