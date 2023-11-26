const { Intro } = require('./intro.m');
const { Movie } = require('./movie.m');


(async () => {
    // const ers = await Movie.getAll();
    // console.log(ers);

    const res = new Intro();
    await res.init();
    console.log(res.top5Rating.map(m => m.im_db_rating));
    console.log(res.top30Boxoffice.map(m => m.title));
})();
