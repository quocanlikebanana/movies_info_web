const { dbService } = require('./dbService');

(async () => {
    try {
        // Init
        console.log((await dbService));
        const res = await (await dbService).getActorList('tt0012349   ');
        // const res = await (await dbService).getAll('movie');
        console.log(res);
    } catch (err) {
        console.log(err);
    } finally {
        console.log('done');
    }
})();