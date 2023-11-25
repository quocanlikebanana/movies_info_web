const { HTMLDisplayError } = require('../utilities/error');
const { DatabaseManager } = require('../utilities/db');


const PersonManager = (function () {
    return {
        async getByPage(pageNum, perPage) {
            const records = await DatabaseManager.getByPage(pageNum, perPage);
            return records;
        },
        async getPerson(id) {
            const record = await DatabaseManager.getDetail(id);
            return record;
        },
        async searchByName(searchStr) {
            const records = await DatabaseManager.searchName(searchStr);
            return records;
        },
        async addPerson(person) {
            const idres = await DatabaseManager.addPerson(person);
            return idres;
        },
        async updatePerson(person, id) {
            const idres = await DatabaseManager.updatePerson(person, id);
            return idres;
        },
        async deletePerson(id) {
            const idres = DatabaseManager.deletePerson(id);
            return idres;
        },
    }
})();



module.exports = { PersonManager };





