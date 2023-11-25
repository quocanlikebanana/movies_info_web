const fetchDelay = 0;

const { HTMLDisplayError } = require('./error');
const { castArray, Person } = require('./general');

class PersonsPage {
    constructor(data) {
        this.page = parseInt(data.page);
        this.per_page = parseInt(data.per_page);
        this.total = parseInt(data.total);
        this.total_pages = parseInt(data.total_pages);
        this.data = castArray(data.data).map(
            raw => new Person(raw)
        );
    }
}

async function myFetch(url) {
    const response = await fetch(url, {
        cache: "no-store",
    });
    if (response.status >= 200 && response.status < 300) {
        const jsonData = await response.json();
        return jsonData;
    } else {
        throw new HTMLDisplayError(
            `Fetch Error`,
            `Error fetching data, with status: ${response.statusText}`
        );
    }
}

async function getPersonsPage(pageNum, perPage) {
    const delayStr = fetchDelay > 0 ? "&delay=1" : "";
    const url = `https://reqres.in/api/users?page=${pageNum}&per_page=${perPage}${delayStr}`;
    const res = await myFetch(url);
    return new PersonsPage(res);
}

const PersonFetchManager = (function () {
    return {
        async getTotalPerson() {
            return (await getPersonsPage(1, 1)).total;
        },
        async fecthByPage(pageNum, perPage) {
            return await getPersonsPage(pageNum, perPage);
        },
    };
})();

module.exports = { PersonFetchManager };


// >>>> DEBUG

// // Use then
// PersonFetchManager.init()
//     .then(
//         () => {
//             console.log('1');
//             console.log(PersonFetchManager.getAll())
//         }
//     );
// // Use async
// (async () => {
//     await PersonFetchManager.init();
//     console.log('2');
//     console.log(PersonFetchManager.getAll());
// })();



// <<<< DEBUG
