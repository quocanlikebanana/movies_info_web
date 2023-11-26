const { currencyToNumber } = require('../helper/string-convert');
const { dbService } = require('../service/dbService');

class Name {
    constructor(nameRecord) {
        this.id = nameRecord.id;
        this.awards = nameRecord.awards;
        this.birth_date = nameRecord.birth_date;
        this.death_date = nameRecord.death_date;
        this.height = nameRecord.height;
        this.image = nameRecord.image;
        this.images = new Array(JSON.parse(nameRecord.images));
        this.name = nameRecord.name;
        this.role = nameRecord.role;
        this.summary = nameRecord.summary;
    }

    static async getDetail(id) {
        return new Name((await dbService).getDetail('name', id));
    }
}

module.exports = { Name };