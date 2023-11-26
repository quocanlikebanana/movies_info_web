const { fsPromise, path } = require('../../../config/lib');
const { pgp, connection, DbAccess, baseDb, ObjectInsert } = require('./dbLib');

async function ReadDataTo(db) {
    const fileContent = JSON.parse(await fsPromise.readFile(path.join(__dirname, '../../../data/data.json'), { encoding: 'utf-8' }));
    const { camelToSnakeCase } = require('../../helper/string-convert');

    const moviesInsert = [];
    const namesInsert = [];
    const reviewsInsert = [];

    const movieActorsInsert = [];
    const movieDirectorsInsert = [];
    const movieWriterInsert = [];
    const movieSimilarsInsert = [];
    const nameCastmoviesInsert = [];

    // Movies
    {
        const movies = fileContent.Movies;
        const multipleProperties = ['actorList', 'directorList', 'similars', 'writerList'];
        const arrProperties = ['genreList', 'images', 'posters'];
        for (const movie of movies) {
            const movieInsert = {};
            for (const key in movie) {
                if (Object.hasOwnProperty.call(movie, key)) {
                    let value = null;
                    if (multipleProperties.includes(key) === false) {
                        if (arrProperties.includes(key) === true) {
                            if (key === 'genreList') {
                                value = JSON.stringify(movie[key]);
                            }
                            else if (key === 'images') {
                                const valueArr = movie[key].map(val => val.image);
                                value = JSON.stringify(valueArr);
                            }
                            else if (key === 'posters') {
                                const valueArr = movie[key].map(val => val.link);
                                value = JSON.stringify(valueArr);
                            }
                        } else {
                            value = movie[key];
                        }
                        const snake_key = camelToSnakeCase(key);
                        movieInsert[snake_key] = value;
                    } else {
                        if (key === 'actorList') {
                            const actorList = movie.actorList;
                            actorList.forEach(actor => {
                                movieActorsInsert.push({
                                    movie_id: movie.id,
                                    name_id: actor.id,
                                    as_character: actor.asCharacter
                                });
                            });
                        }
                        else if (key === 'directorList') {
                            const directorList = movie.directorList;
                            directorList.forEach(directorId => {
                                movieDirectorsInsert.push({
                                    movie_id: movie.id,
                                    name_id: directorId
                                });
                            });
                        }
                        else if (key === 'similars') {
                            const similars = movie.similars;
                            similars.forEach(similarId => {
                                movieSimilarsInsert.push({
                                    movie_id: movie.id,
                                    movie_id_similar: similarId
                                });
                            });
                        }
                        else if (key === 'writerList') {
                            const writerList = movie.writerList;
                            writerList.forEach(writerId => {
                                movieWriterInsert.push({
                                    movie_id: movie.id,
                                    name_id: writerId
                                });
                            });
                        }
                    }
                }
            }
            moviesInsert.push(movieInsert);
        }
    }

    // Name
    {
        const names = fileContent.Names;
        const multipleProperties = ['castMovies'];
        const arrProperties = ['images'];
        for (const name of names) {
            const nameInsert = {};
            for (const key in name) {
                if (Object.hasOwnProperty.call(name, key)) {
                    let value = null;
                    if (multipleProperties.includes(key) === false) {
                        if (arrProperties.includes(key) === true) {
                            if (key === 'images') {
                                value = JSON.stringify(name[key]);
                            }
                        } else {
                            value = name[key];
                        }
                        const snake_key = camelToSnakeCase(key);
                        nameInsert[snake_key] = value;
                    } else {
                        if (key === 'castMovies') {
                            const castMovies = name.castMovies;
                            castMovies.forEach(movie => {
                                nameCastmoviesInsert.push({
                                    name_id: name.id,
                                    movie_id: movie.id,
                                    role: movie.role
                                });
                            });
                        }
                    }
                }
            }
            namesInsert.push(nameInsert);
        }
    }

    // Review
    {
        const reviews = fileContent.Reviews;
        const multipleProperties = [];
        const arrProperties = [];
        for (const movieReviews of reviews) {
            const items = movieReviews.items;
            for (const item of items) {
                const reviewInsert = {};
                reviewInsert.movie_id = movieReviews.movieId;
                for (const key in item) {
                    if (Object.hasOwnProperty.call(item, key)) {
                        const value = item[key];
                        const snake_key = camelToSnakeCase(key);
                        reviewInsert[snake_key] = value;
                    }
                }
                reviewsInsert.push(reviewInsert);
            }
        }
    }

    // Push records to DB, Looped twice but easy to read, debug
    if (true) {
        moviesInsert.forEach(movie => {
            ObjectInsert(db, 'movie', movie);
        });
        namesInsert.forEach(name => {
            ObjectInsert(db, 'name', name);
        });
        reviewsInsert.forEach(review => {
            ObjectInsert(db, 'review', review);
        });
        movieActorsInsert.forEach(movieActor => {
            ObjectInsert(db, 'movie_name_actor', movieActor);
        });
        movieDirectorsInsert.forEach(movieDirector => {
            ObjectInsert(db, 'movie_name_director', movieDirector);
        });
        movieSimilarsInsert.forEach(movieSimilar => {
            ObjectInsert(db, 'movie_movie_similar', movieSimilar);
        });
        movieWriterInsert.forEach(movieWriter => {
            ObjectInsert(db, 'movie_name_writer', movieWriter);
        });
        nameCastmoviesInsert.forEach(nameCastmovie => {
            ObjectInsert(db, 'name_movie_cast', nameCastmovie);
        });
    }
}


async function InitDatabase(dbName) {
    // Return a connection (lazy) to database
    const newConnection = connection;
    newConnection.database = dbName;
    const db = pgp(connection);
    // Check database exists
    const check = await DbAccess(baseDb, 'one', `SELECT COUNT(*) FROM pg_catalog.pg_database WHERE datname = $1`, [dbName]);
    if (check && check.count === '0') {
        // Create database
        await DbAccess(baseDb, 'none', 'CREATE DATABASE $1:name ', [dbName]);
        // Add tables
        const { schema } = require('./table.schema');
        await DbAccess(db, 'none', schema);
        // Add data
        await ReadDataTo(db);
        console.log('created new database');
    } else {
        console.log('database already existed');
    }
    // await ReadDataTo(db); // Force to read
    return db;
}

module.exports = { InitDatabase };
