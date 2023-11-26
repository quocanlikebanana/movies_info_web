const { Movie } = require('./movie.m');
const { getTop } = require('../helper/array');
const { currencyToNumber } = require('../helper/string-convert');

class Intro {
    constructor() {
        this.top5Rating = [];
        this.top30Boxoffice = [];
        this.top30Mostfav = [];
    }
    async init() {
        const movies = await Movie.getAll();
        this.top5Rating = getTop(movies, 5, (a, b) => {
            const ra = parseFloat(a.im_db_rating) || 0;
            const rb = parseFloat(b.im_db_rating) || 0;
            return rb - ra;
        });
        this.top30Boxoffice = getTop(movies, 30, (a, b) => {
            const ba = currencyToNumber(a.box_office) || 0;
            const bb = currencyToNumber(b.box_office) || 0;
            return bb - ba;
        });
        // this.top30Mostfav = getTop(movies, 30, (a, b) => {
        //     const ba = currencyToNumber(a.box_office);
        //     const bb = currencyToNumber(b.box_office);
        //     return bb - ba;
        // });
    }
}

module.exports = { Intro };

