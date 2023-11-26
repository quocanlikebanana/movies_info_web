const { dbService } = require('../service/dbService');

class Review {
    constructor(reviewRecord) {
        this.id = reviewRecord.id;
        this.movie_id = reviewRecord.movie_id;
        this.content = reviewRecord.content;
        this.date = reviewRecord.date;
        this.rate = reviewRecord.rate;
        this.title = reviewRecord.title;
        this.username = reviewRecord.username;
        this.warning_spoilers = reviewRecord.warning_spoilers;
    }

    // static async getDetail(id) {
    //     return new Review((await dbService).getDetail('review', id));
    // }
}

module.exports = { Review };