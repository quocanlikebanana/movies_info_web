const { Person } = require('./general');
const { PersonFetchManager } = require('./fetch');

require('dotenv').config();

const pgp = require('pg-promise')({
    capSQL: true,
});

const connection = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPW,
    max: 30,
}

const db = pgp(connection);
// Double quote problem: TABLE and COLUMN with capital letters name needs double quote to reference
// If they don't have caps, we can reference by it's name even with capped letter like: id -> Id, ID, iD
// But when using parametered query, they will be acounted for
// const personTableName = '"Person"';
// https://stackoverflow.com/questions/6331504/omitting-the-double-quote-to-do-query-on-postgresql
const tableName = 'person';

// !!!!!
// If we don't await (in promise db actions): Querying against a released or lost connection.
// !!!!!

// search != get, if there's no record, get => throw error, search => return null

async function dbAccess(dbAction, query, valueArr) {
    let dbcn = null;
    try {
        dbcn = await db.connect();
        const res = await dbcn[dbAction]({ text: query, values: valueArr });
        return res;
    } catch (err) {
        throw (err);
    } finally {
        if (dbcn) {
            dbcn.done();
        }
    }
}


const DatabaseManager = (function () {
    let inited = false;
    let totalPerson;
    return {
        initConstraint() {
            if (inited === false) {
                throw new Error('Database manager has not initialized');
            }
        },
        async clearData() {
            await dbAccess('none', `TRUNCATE TABLE ${tableName} RESTART IDENTITY`);
        },
        async loadData() {
            if (inited === false) {
                inited = true;
                totalPerson = await PersonFetchManager.getTotalPerson();
                // Trucate table
                await this.clearData();
                // id here is fetch id, which is its order
                const data = (await PersonFetchManager.fecthByPage(1, totalPerson)).data.sort((pa, pb) => pa.id - pb.id);
                // Will cast person.id => table's id
                // All 12 records will run independently
                data.forEach(async person => {
                    const countTest = await this.addPerson(person);
                    console.log(countTest);
                });
            }
        },
        async getByPage(pageNum, perPage) {
            this.initConstraint();
            totalPerson = (await dbAccess('one', `SELECT count(*) FROM ${tableName}`)).count;
            const offset = (pageNum - 1) * perPage;
            const records = await dbAccess('any', `SELECT * FROM ${tableName} ORDER BY id ASC LIMIT $1 OFFSET $2`, [perPage, offset]);
            return {
                data: records.map(dbPerson => new Person(dbPerson)),
                total: totalPerson,
            };
        },
        async getDetail(id) {
            const record = await dbAccess('one', `SELECT * FROM ${tableName} WHERE id = $1`, [id]);
            return new Person(record);
        },
        async searchName(searchStr) {
            const query = `SELECT * FROM ${tableName} WHERE CONCAT(first_name, ' ', last_name) LIKE '%${searchStr}%' ORDER BY id`;
            const records = await dbAccess('any', query);
            return records.map(dbPerson => new Person(dbPerson));
        },
        // Query need key? - When insert with id, or add row (in the UI with id specified), the auto-increment won't increase
        // Therefore, when insert with auto increment, it will cause collision of PK.
        // https://stackoverflow.com/questions/15464852/insert-statement-asked-me-to-insert-for-autoincrement-column
        // Need to deattach id in INSERT and UPDATE
        async addPerson(person) {
            this.initConstraint();
            // Omitt id prop here for auto-increment
            // Or specify columns, or using ?column (? not yet tested) 
            const { id, ...dbPerson } = person;
            const query = pgp.helpers.insert(dbPerson, null, tableName) + ' RETURNING id';
            const result = await dbAccess('one', query);
            return result.id;
        },
        async updatePerson(person, idUpdate) {
            this.initConstraint();
            const condition = ` WHERE id = ${idUpdate}`;
            const { id, ...dbPerson } = person;
            const query = pgp.helpers.update(dbPerson, null, tableName) + condition + ' RETURNING id';
            const result = await dbAccess('one', query);
            return result.id;
        },
        async deletePerson(id) {
            this.initConstraint();
            const record = await dbAccess('one', `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`, [id]);
            return record.id;
        },
    };
})();











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





module.exports = { DatabaseManager };