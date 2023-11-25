
const { dbService } = require('./dbService');
require('dotenv').config();

(async () => {
    try {
        console.log((await dbService));
    } catch (err) {
        console.log(err);
    } finally {
        console.log('done');
    }
})();