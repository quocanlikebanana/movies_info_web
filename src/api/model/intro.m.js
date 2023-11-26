const { Movie } = require('./movie.m');
const { Fav } = require('./fav.m');
const { getTop } = require('../helper/array');
const { currencyToNumber } = require('../helper/string-convert');

class Intro {
    static async get() {
        const movies = await Movie.getAll();
        const top5Rating = getTop(movies, 5, (a, b) => {
            const ra = parseFloat(a.im_db_rating) || 0;
            const rb = parseFloat(b.im_db_rating) || 0;
            return rb - ra;
        });
        const top30Boxoffice = getTop(movies, 30, (a, b) => {
            const ba = currencyToNumber(a.box_office) || 0;
            const bb = currencyToNumber(b.box_office) || 0;
            return bb - ba;
        });
        const favMovies = await Fav.getAll();
        const top30Mostfav = getTop(favMovies, 30, (a, b) => {
            const ra = parseFloat(a.im_db_rating) || 0;
            const rb = parseFloat(b.im_db_rating) || 0;
            return rb - ra;
        });

        return {
            top5Rating,
            top30Boxoffice,
            top30Mostfav,
        }
    }
}

module.exports = { Intro };

