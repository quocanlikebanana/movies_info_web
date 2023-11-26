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

export default {

    // === INTRO:

    async getIntroData() {
        const url = `${serverAddress}/intro`;
        const res = await fetchGet(url);
        return res;
    },

    // === MOVIE:

    // Also gives total page
    async getDetailMovie(movieId) {
        const url = `${serverAddress}/movie/detail/${movieId}`;
        const res = await fetchGet(url);
        return res;
    },

    // Must have AJAX
    async getPageMovieReview(movieId, pageNum) {
        const url = `${serverAddress}/movie/detail/review/${movieId}/${pageNum}`;
        const res = await fetchGet(url);
        return res;
    },

    // No need AJAX for paging
    // search key: movie name, movie gerne
    async searchMovie(searchKey, perPage) {
        const url = `${serverAddress}/movie/search/${searchKey}`;
        // Array of array of movie, with length of perPage
        const res = await fetchGet(url);
        return res;
    },

    // === FAV:

    async getPageFavMovie(pageNum) {
        const url = `${serverAddress}/fav/${pageNum}`;
        const res = await fetchGet(url);
        return res;
    },

    async insertIntoFavMovie(movieId) {
        const url = `${serverAddress}/fav/insert/${movieId}`;
        const res = await fetchGet(url);
        return res;
    },

    async deleteFromFavMovie(movieId) {
        const url = `${serverAddress}/fav/delete/${movieId}`;
        const res = await fetchGet(url);
        return res;
    },

    // === NAME:

    async getDetailName(nameId) {
        const url = `${serverAddress}/name/detail/${nameId}`;
        const res = await fetchGet(url);
        return res;
    },

    async searchName(searchKey) {
        const url = `${serverAddress}/name/search/${searchKey}`;
        // Array (of array of name) with length of perPage
        const res = await fetchGet(url);
        return res;
    },
}