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
        this.images = JSON.parse(nameRecord.images);
        this.name = nameRecord.name;
        this.role = nameRecord.role;
        this.summary = nameRecord.summary;
        this.thumbnail = {
            cast_list: [],
        };
    }

    static async getDetail(id) {
        const res = new Name(await (await dbService).getDetail('name', id));
        res.thumbnail.cast_list = (await (await dbService).getCastList(id)).map(m => {
            return {
                id: m.id,
                title: m.title,
                image: m.image,
            }
        });
        return res;
    }

    static async search(key) {
        const res = (await (await dbService).searchName(key));
        return res;
    }
}

module.exports = { Name };