const env = require("../../config/env");
const { pgp } = require('./dbLib');
const { pgp } = require('./dbLib');
const { DbAccess } = require('./dbLib');


// Perform Insert for Object base on key - value

async function ObjectInsert(db, tableName, obj) {
    const rawText = text => ({ _rawType: true, toPostgres: () => text });
    const defCol = name => ({ name, def: rawText('NULL') });
    const cols = Object.keys(obj).map(defCol);
    const cs = new pgp.helpers.ColumnSet(cols, { table: tableName });
    const query = pgp.helpers.insert(obj, cs) + ' ON CONFLICT (id) DO NOTHING';
    await DbAccess(db, 'none', query);
}
exports.ObjectInsert = ObjectInsert;


async function GetCurrentDatabase(db) {
    // const query = 'SELECT current_catalog';
    const query = 'SELECT current_database()';
    return await DbAccess(db, 'one', query);
}
exports.GetCurrentDatabase = GetCurrentDatabase; const connection = {
    host: env.db_host,
    port: env.db_port,
    database: env.db_database,
    user: env.db_user,
    password: env.db_password,
    max: 50,
};
exports.connection = connection;
const baseDb = pgp(connection);
exports.baseDb = baseDb;
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
exports.DbAccess = DbAccess;
// Only perform the query

async function DbPerform(db, queryFunc) {
    let dbcn = null;
    try {
        dbcn = await db.connect();
        const res = await queryFunc(db);
        return res;
    } catch (err) {
        throw (err);
    } finally {
        if (dbcn) {
            dbcn.done();
        }
    }
}
exports.DbPerform = DbPerform;
const pgp = require('pg-promise')({
    capSQL: true,
});
exports.pgp = pgp;

