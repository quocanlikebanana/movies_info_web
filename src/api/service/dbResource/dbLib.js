const env = require("../../../config/env");
const pgp = require('pg-promise')({
    capSQL: true,
});


// Perform Insert for Object base on key - value
async function ObjectInsert(db, tableName, obj) {
    const rawText = text => ({ _rawType: true, toPostgres: () => text });
    const defCol = name => ({ name, def: rawText('NULL') });
    const cols = Object.keys(obj).map(defCol);
    const cs = new pgp.helpers.ColumnSet(cols, { table: tableName });
    const query = pgp.helpers.insert(obj, cs) + ' ON CONFLICT (id) DO NOTHING';
    await DbAccess(db, 'none', query);
}

async function GetCurrentDatabase(db) {
    // const query = 'SELECT current_catalog';
    const query = 'SELECT current_database()';
    return await DbAccess(db, 'one', query);
}

const connection = {
    host: env.db_host,
    port: env.db_port,
    database: env.db_database,
    user: env.db_user,
    password: env.db_password,
    max: 50,
};

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

// Only perform the query
async function DbPerform(db, queryFunc) {
    let dbcn = null;
    try {
        dbcn = await db.connect();
        const res = await queryFunc(dbcn);
        return res;
    } catch (err) {
        throw (err);
    } finally {
        if (dbcn) {
            dbcn.done();
        }
    }
}


module.exports = {
    pgp,
    DbPerform,
    DbAccess,
    baseDb,
    connection,
    GetCurrentDatabase,
    ObjectInsert
};

