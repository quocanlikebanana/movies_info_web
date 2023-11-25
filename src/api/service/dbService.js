const pgp = require('pg-promise')({
    capSQL: true,
});

const env = require('../../config/env');
const { fsPromise, path } = require('../../config/lib');

const connection = {
    host: env.db_host,
    port: env.db_port,
    database: env.db_database,
    user: env.db_user,
    password: env.db_password,
    max: 50,
}

const baseDb = pgp(connection);


// dbAction: (string) one, none, any
// query: (string) query string
// valueArr: (string[]) value to replace in query string
async function DbAccess(db, dbAction, queryString, valueArr) {
    let dbcn = null;
    try {
        dbcn = await db.connect();
        const res = await dbcn[dbAction](queryString, valueArr);
        return res;
    } catch (err) {
        throw (err);
    } finally {
        if (dbcn) {
            dbcn.done();
        }
    }
}


// function InserMovie(movie, db) {
//     for (const key in movie) {
//         if (Object.hasOwnProperty.call(movie, key)) {
//             const value = movie[key];
//             const snake_key = camelToSnakeCase(key);
//         }
//     }
// }


// Perform Insert for Object base on key - value
async function ObjectInsert(db, tableName, obj) {
    const rawText = text => ({ _rawType: true, toPostgres: () => text });
    const defCol = name => ({ name, def: rawText('NULL') });
    const cols = Object.keys(obj).map(defCol);
    const cs = new pgp.helpers.ColumnSet(cols, { table: tableName });
    const query = pgp.helpers.insert(obj, cs) + ' ON CONFLICT (id) DO NOTHING';
    await DbAccess(db, 'none', query);
}


async function ReadDataTo(db) {
    const fileContent = JSON.parse(await fsPromise.readFile(path.join(__dirname, '../../../data/data.json'), { encoding: 'utf-8' }));
    const { camelToSnakeCase } = require('../helper/string-convert');

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
        const { schema } = require('./dbResource/table.schema');
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

async function GetCurrentDatabase(db) {
    // const query = 'SELECT current_catalog';
    const query = 'SELECT current_database()';
    return await DbAccess(db, 'one', query);
}

//====================================//
//====================================//


const dbService = (async () => {
    // const dbName = `db${process.env.INDIVIDUAL_MARK}`;
    // const dbName = `test`;
    const dbName = `testFull`;

    let currentDb = await InitDatabase(dbName);
    console.log(await GetCurrentDatabase(currentDb));
    return {
        async getAll(tableName) {
            const record = await DbAccess(currentDb, 'any', `SELECT * FROM $1:name`, [tableName]);
            return record;
        },
    };
})();

module.exports = { dbService };















// const DatabaseManager = (function () {
//     let inited = false;
//     let totalPerson;
//     return {
//         initConstraint() {
//             if (inited === false) {
//                 throw new Error('Database manager has not initialized');
//             }
//         },
//         async clearData() {
//             await dbAccess('none', `TRUNCATE TABLE ${tableName} RESTART IDENTITY`);
//         },
//         async loadData() {
//             if (inited === false) {
//                 inited = true;
//                 totalPerson = await PersonFetchManager.getTotalPerson();
//                 // Trucate table
//                 await this.clearData();
//                 // id here is fetch id, which is its order
//                 const data = (await PersonFetchManager.fecthByPage(1, totalPerson)).data.sort((pa, pb) => pa.id - pb.id);
//                 // Will cast person.id => table's id
//                 // All 12 records will run independently
//                 data.forEach(async person => {
//                     const countTest = await this.addPerson(person);
//                     console.log(countTest);
//                 });
//             }
//         },
//         async getByPage(pageNum, perPage) {
//             this.initConstraint();
//             totalPerson = (await dbAccess('one', `SELECT count(*) FROM ${tableName}`)).count;
//             const offset = (pageNum - 1) * perPage;
//             const records = await dbAccess('any', `SELECT * FROM ${tableName} ORDER BY id ASC LIMIT $1 OFFSET $2`, [perPage, offset]);
//             return {
//                 data: records.map(dbPerson => new Person(dbPerson)),
//                 total: totalPerson,
//             };
//         },
//         async getDetail(id) {
//             const record = await dbAccess('one', `SELECT * FROM ${tableName} WHERE id = $1`, [id]);
//             return new Person(record);
//         },
//         async searchName(searchStr) {
//             const query = `SELECT * FROM ${tableName} WHERE CONCAT(first_name, ' ', last_name) LIKE '%${searchStr}%' ORDER BY id`;
//             const records = await dbAccess('any', query);
//             return records.map(dbPerson => new Person(dbPerson));
//         },
//         // Query need key? - When insert with id, or add row (in the UI with id specified), the auto-increment won't increase
//         // Therefore, when insert with auto increment, it will cause collision of PK.
//         // https://stackoverflow.com/questions/15464852/insert-statement-asked-me-to-insert-for-autoincrement-column
//         // Need to deattach id in INSERT and UPDATE
//         async addPerson(person) {
//             this.initConstraint();
//             // Omitt id prop here for auto-increment
//             // Or specify columns, or using ?column (? not yet tested) 
//             const { id, ...dbPerson } = person;
//             const query = pgp.helpers.insert(dbPerson, null, tableName) + ' RETURNING id';
//             const result = await dbAccess('one', query);
//             return result.id;
//         },
//         async updatePerson(person, idUpdate) {
//             this.initConstraint();
//             const condition = ` WHERE id = ${idUpdate}`;
//             const { id, ...dbPerson } = person;
//             const query = pgp.helpers.update(dbPerson, null, tableName) + condition + ' RETURNING id';
//             const result = await dbAccess('one', query);
//             return result.id;
//         },
//         async deletePerson(id) {
//             this.initConstraint();
//             const record = await dbAccess('one', `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`, [id]);
//             return record.id;
//         },
//     };
// })();












// module.exports = { DatabaseManager };


(async () => {
    // const dbconnection = await db.connect();
    // const data = await dbconnection.any({
    //     text: 'SELECT * FROM person',
    // })
    // console.log((data));


    // console.log(await DatabaseManager.getByPage(1, 2));


    // console.log(await DatabaseManager.getDetail(2));


    // console.log(await DatabaseManager.addPerson({
    //     first_name: 'asdasd',
    //     last_name: 'asdasd',
    //     email: 'asdasd',
    //     avatar: 'asdasd',
    // }));


    // await PersonFetchManager.init();
    // await DatabaseManager.loadData();


    // console.log(await DatabaseManager.addPerson({
    //     id: 12312312,
    //     first_name: 'asdasd',
    //     last_name: 'asdasd',
    //     email: 'asdasd',
    //     avatar: 'asdasd',
    // }));


    // console.log(await DatabaseManager.updatePerson({
    //     id: 12312312,
    //     first_name: 'gggggg',
    //     last_name: 'ggg',
    //     email: 'ga',
    //     avatar: 'sad',
    // }, 13));


    // console.log(await DatabaseManager.deletePerson(1));


    // await DatabaseManager.loadData();
    // await DatabaseManager.clearData();


    // // FULL TEST - success
    // await DatabaseManager.clearData();
    // await DatabaseManager.loadData();
    // console.log(await DatabaseManager.deletePerson(1));
    // console.log(await DatabaseManager.getByPage(1, 3));
    // console.log(await DatabaseManager.getDetail(2));
    // console.log(await DatabaseManager.addPerson({
    //     first_name: 'asdasd',
    //     last_name: 'asdasd',
    //     email: 'asdasd',
    //     avatar: 'asdasd',
    // }));
    // console.log(await DatabaseManager.updatePerson({
    //     id: 12312312,
    //     first_name: 'gggggg',
    //     last_name: 'ggg',
    //     email: 'ga',
    //     avatar: 'sad',
    // }, 4));
    // console.log(await DatabaseManager.getByPage(1, 3));
    // console.log(await DatabaseManager.deletePerson(4));
    // console.log(await DatabaseManager.getByPage(1, 3));

    // console.log(await DatabaseManager.searchName('n F'));

})();





