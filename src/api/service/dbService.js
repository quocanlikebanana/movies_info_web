const { InitDatabase } = require('./dbResource/dbInit');
const { DbAccess, DbPerform } = require('./dbResource/dbLib');
const { GetCurrentDatabase } = require('./dbResource/dbLib');

//====================================//
//====================================//


const dbService = (async () => {
    // const dbName = `db${process.env.INDIVIDUAL_MARK}`;
    // const dbName = `test`;
    const dbName = `testFull`;

    let currentDb = await InitDatabase(dbName);
    console.log(await GetCurrentDatabase(currentDb));
    return {

        // === Generic:

        async total(tableName) {

        },

        async getAll(tableName) {
            const record = await DbAccess(currentDb, 'any', `SELECT * FROM $1:name`, [tableName]);
            return record;
        },

        async getRange(tableName, start, end) {
            const record = await DbAccess(currentDb, 'any', `SELECT * FROM $1:name`, [tableName]);
            return record;
        },

        async getDetail(tableName, id) {
            const record = await DbAccess(currentDb, 'any', `SELECT * FROM $1:name`, [tableName]);
            return record;
        },

        // === Movie:

        async getActorList(movieId) {
            const query1 = `SELECT name_id FROM movie_name_actor WHERE movie_id = $1:value`;
            const query2 = `SELECT * FROM name WHERE name_id = $1:value`;
            const res = await DbPerform(currentDb, async function () {
                currentDb.task(async t => {
                    return t.any(query1, [movieId])
                        .then(rec => {
                            if (rec) {
                                return t.one(query2, rec.name_id);
                            }
                            return [];
                        });
                });
            });
            return res;
        }



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





