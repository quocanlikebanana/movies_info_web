const { InitDatabase } = require('./dbResource/dbInit');
const { DbAccess, GetCurrentDatabase, pgp } = require('./dbResource/dbLib');
const { offset } = require('../helper/paging');


const dbService = (async () => {
    // const dbName = `db${process.env.INDIVIDUAL_MARK}`;
    // const dbName = `test`;
    const dbName = `testFull`;

    // Always check if exists on call
    let currentDb = await InitDatabase(dbName);
    console.log(await GetCurrentDatabase(currentDb));
    return {
        // === Generic:

        async total(tableName) {
            const record = await DbAccess(currentDb, 'one', `SELECT COUNT(*) FROM $1:name`, [tableName]);
            return parseInt(record.count);
        },

        async getAll(tableName) {
            const record = await DbAccess(currentDb, 'any', `SELECT * FROM $1:name`, [tableName]);
            return record;
        },

        async getRange(tableName, perPage, pageNum) {
            const query = ` SELECT * FROM $1:name ORDER BY id ASC LIMIT $2:value OFFSET $3:value`;
            const offsetRec = offset(perPage, pageNum);
            const record = await DbAccess(currentDb, 'any', query, [tableName, perPage, offsetRec]);
            return record;
        },

        async getDetail(tableName, id) {
            // Keep the id at general type (not value, raw or name)
            const record = await DbAccess(currentDb, 'one', `SELECT * FROM $1:name WHERE id = $2`, [tableName]);
            return record;
        },

        // === INTRO:


        // === MOVIE:

        async getActorList(movieId) {
            const query = `
            SELECT *
            FROM movie_name_actor INNER JOIN name ON name.id = movie_name_actor.name_id
            WHERE movie_id = \'$1:value\'
            `;
            const res = await DbAccess(currentDb, 'any', query, [movieId]);
            return res;
        },

        async getDirectorList(movieId) {
            const query = `
            SELECT *
            FROM movie_name_director INNER JOIN name ON name.id = movie_name_director.name_id
            WHERE movie_id = \'$1:value\'
            `;
            const res = await DbAccess(currentDb, 'any', query, [movieId]);
            return res;
        },

        async getWriterList(movieId) {
            const query = `
            SELECT *
            FROM movie_name_writer INNER JOIN name ON name.id = movie_name_writer.name_id
            WHERE movie_id = \'$1:value\'
            `;
            const res = await DbAccess(currentDb, 'any', query, [movieId]);
            return res;
        },

        async getSimilarList(movieId) {
            const query = `
            SELECT *
            FROM movie_movie_similar INNER JOIN movie ON movie.id = movie_movie_similar.movie_id_similar
            WHERE movie_id = \'$1:value\'
            `;
            const res = await DbAccess(currentDb, 'any', query, [movieId]);
            return res;
        },

        // Need paging
        async getReviewList(movieId, perPage, pageNum) {
            const query = `
            SELECT * FROM review WHERE movie_id = \'$1:value\
            ORDER BY id ASC LIMIT $2:value OFFSET $3:value
            `;
            const offsetRec = offset(perPage, pageNum);
            const res = await DbAccess(currentDb, 'any', query, [movieId, perPage, offsetRec]);

            const queryTotal = `
            SELECT COUNT(*) FROM review WHERE movie_id = \'$1:value\
            `;
            const resTotal = await DbAccess(currentDb, 'any', query, [movieId]);
            return {
                res: res,
                total: resTotal,
            };
        },

        // Search by name and gerne (paging for model)
        async searchMovie(key) {
            const queryTitle = `SELECT * FROM movie WHERE title ILIKE \'%$1#%\'`;
            const resTitle = await DbAccess(currentDb, 'any', queryTitle, [key]);
            const queryGerne = `SELECT * FROM movie`;
            const resGerne = (await DbAccess(currentDb, 'any', queryGerne));
            resGerne = resGerne.filter(res => {
                const gernes = JSON.parse(res.genre_list);
                return gernes.includes(key);
            });
            const res = resTitle.concat(resGerne);
            return res;
        },

        // === FAV MOVIE:

        async getPageFavMovie(perPage, pageNum) {
            const query = `
            SELECT * FROM movie_fav INNER JOIN movie ON movie_fav.movie_id = movie.id
            ORDER BY movie_id ASC LIMIT $1:value OFFSET $2:value
            `;
            const offsetRec = offset(perPage, pageNum);
            const res = await DbAccess(currentDb, 'any', query, [perPage, offsetRec]);
            return res;
        },

        async getAllFavMovie() {
            const query = `
            SELECT * FROM movie_fav INNER JOIN movie ON movie_fav.movie_id = movie.id
            `;
            const res = await DbAccess(currentDb, 'any', query);
            return res;
        },

        async insertFavMovie(movieId) {
            const query = pgp.helpers.insert({ movie_id: movieId }, null, 'movie_fav') + ' RETURNING id';
            const result = await DbAccess(currentDb, 'one', query);
            return result.id;
        },

        async deleteFavMovie(movieId) {
            const query = `DELETE FROM movie_fav WHERE id = $1:value RETURNING id`;
            const result = await DbAccess(currentDb, 'one', query);
            return result.id;
        },

        // === NAME:

        async getCastList(nameId) {
            const query = `
            SELECT *
            FROM name_movie_cast INNER JOIN movie ON name_movie_cast.movie_id = movie.id
            WHERE name_id = \'$1:value\'
            `;
            const res = await DbAccess(currentDb, 'any', query, [nameId]);
            return res;
        },

        async searchName(key) {
            const query = `SELECT * FROM name WHERE name ILIKE \'%$1:value%\'`;
            const res = await DbAccess(currentDb, 'any', query, [key]);
            return res;
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





