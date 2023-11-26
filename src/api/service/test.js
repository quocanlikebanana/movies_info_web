
const { dbService } = require('./dbService');
require('dotenv').config();

(async () => {
    try {
        // Init
        console.log((await dbService));
        const res = await (await dbService).getActorList('tt0012349      ');
        console.log(res);
    } catch (err) {
        console.log(err);
    } finally {
        console.log('done');
    }
})();