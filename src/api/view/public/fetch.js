const serverAddress = 'http://localhost:21190';


async function fetchGet(url) {
    const response = await fetch(url, {
        cache: "no-store",
        method: 'GET',
        // No need for content type in get request
        // headers: { 'content-type': 'application/json' },
    });
    if (response.status >= 200 && response.status < 300) {
        const json = await response.json();
        return json;
    } else {
        // Error
        if (response.status === 500) {
            window.location = '/error';
        }
    }
}

// === INTRO:

async function getIntroData() {
    const url = `${serverAddress}/intro`;
    return await fetchGet(url);
}

// === MOVIE:

async function getDetailMovie(movieId) {
    const url = `${serverAddress}/movie/detail/${movieId}`;
    return await fetchGet(url);
}

// No need AJAX for paging
// search key: movie name, movie gerne
async function searchMovie(searchKey, perPage) {
    const url = `${serverAddress}/movie/search/${searchKey}/${perPage}`;
    // Array of array of movie, with length of perPage
    return await fetchGet(url);
}

// === FAV:

async function getPageFavMovie(perPage, pageNum) {
    const url = `${serverAddress}/fav/${perPage}/${pageNum}`;
    return await fetchGet(url);
}

async function insertIntoFavMovie(movieId) {
    const url = `${serverAddress}/fav/insert/${movieId}`;
    return await fetchGet(url);
}

async function deleteFromFavMovie(movieId) {
    const url = `${serverAddress}/fav/delete/${movieId}`;
    return await fetchGet(url);
}

// === NAME:

async function getDetailName(nameId) {
    const url = `${serverAddress}/name/detail/${nameId}`;
    return await fetchGet(url);
}

async function searchName(searchKey, perPage) {
    const url = `${serverAddress}/name/search/${searchKey}/${perPage}`;
    // Array (of array of name) with length of perPage
    return await fetchGet(url);
}

// === REVIEW:

// Must have AJAX
// Gives total page for first get
async function getPageMovieReview(movieId, perPage, pageNum) {
    const url = `${serverAddress}/review/${movieId}/${perPage}/${pageNum}`;
    return await fetchGet(url);
}



